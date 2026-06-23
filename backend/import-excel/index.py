import json
import os
import base64
import io
import re
import psycopg2
import openpyxl


def slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r'[^\w\s-]', '', text, flags=re.UNICODE)
    text = re.sub(r'[\s_-]+', '-', text)
    return text[:100]


def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])


def handler(event: dict, context) -> dict:
    """Принимает Excel-файл в base64, парсит листы и сохраняет товары в БД."""
    cors = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors, 'body': ''}

    body = json.loads(event.get('body') or '{}')
    file_b64 = body.get('file')
    mode = body.get('mode', 'append')  # 'append' или 'replace'

    if not file_b64:
        return {'statusCode': 400, 'headers': cors, 'body': json.dumps({'error': 'file required'})}

    file_bytes = base64.b64decode(file_b64)
    wb = openpyxl.load_workbook(io.BytesIO(file_bytes), data_only=True)

    # Определяем лист с оглавлением
    toc_sheet = None
    for name in wb.sheetnames:
        if 'оглавлен' in name.lower() or 'содержан' in name.lower() or 'index' in name.lower():
            toc_sheet = name
            break

    # Листы с товарами — всё кроме оглавления
    product_sheets = [s for s in wb.sheetnames if s != toc_sheet]

    conn = get_conn()
    cur = conn.cursor()

    stats = {'groups': 0, 'categories': 0, 'products': 0, 'sheets': []}

    for sheet_name in product_sheets:
        ws = wb[sheet_name]
        slug = slugify(sheet_name)

        # Создаём или обновляем группу товаров
        cur.execute(
            "INSERT INTO product_groups (name, slug, sort_order) VALUES (%s, %s, %s) "
            "ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name "
            "RETURNING id",
            (sheet_name, slug, product_sheets.index(sheet_name))
        )
        group_id = cur.fetchone()[0]
        stats['groups'] += 1

        if mode == 'replace':
            cur.execute("UPDATE products SET category_id = NULL WHERE group_id = %s", (group_id,))
            cur.execute("DELETE FROM product_categories WHERE group_id = %s", (group_id,))
            cur.execute("DELETE FROM products WHERE group_id = %s", (group_id,))

        rows = list(ws.iter_rows(values_only=True))
        if not rows:
            continue

        current_category_id = None
        current_category_name = None
        headers = None
        sheet_products = 0
        sheet_categories = 0

        for row in rows:
            # Пропускаем полностью пустые строки
            non_empty = [c for c in row if c is not None and str(c).strip() != '']
            if not non_empty:
                headers = None  # сброс заголовков при пустой строке
                continue

            # Строка с одним значением в первой колонке — это категория
            if len(non_empty) == 1 and row[0] is not None:
                cat_name = str(row[0]).strip()
                if cat_name and not cat_name.replace(' ', '').replace('-', '').isdigit():
                    cur.execute(
                        "INSERT INTO product_categories (group_id, name, sort_order) VALUES (%s, %s, %s) RETURNING id",
                        (group_id, cat_name, sheet_categories)
                    )
                    current_category_id = cur.fetchone()[0]
                    current_category_name = cat_name
                    headers = None
                    sheet_categories += 1
                    stats['categories'] += 1
                continue

            # Строка-заголовок: если первая ячейка текстовая и нет числовых значений
            first_cell = str(row[0]).strip() if row[0] is not None else ''
            all_text = all(
                isinstance(c, str) or c is None
                for c in non_empty
            )
            if all_text and headers is None and len(non_empty) >= 2:
                headers = [str(c).strip() if c is not None else '' for c in row]
                continue

            # Строка с товаром
            if headers is not None:
                title = str(row[0]).strip() if row[0] is not None else ''
                if not title:
                    continue

                specs = {}
                for idx, h in enumerate(headers[1:], 1):
                    if idx < len(row) and row[idx] is not None and h:
                        specs[h] = str(row[idx]).strip()

                cur.execute(
                    "INSERT INTO products (group_id, category_id, title, specs, sort_order) VALUES (%s, %s, %s, %s, %s)",
                    (group_id, current_category_id, title, json.dumps(specs, ensure_ascii=False), sheet_products)
                )
                sheet_products += 1
                stats['products'] += 1
            else:
                # Нет заголовков — сохраняем как товар с пустыми specs
                title = str(row[0]).strip() if row[0] is not None else ''
                if title:
                    specs = {}
                    for idx, val in enumerate(row[1:], 1):
                        if val is not None:
                            specs[f'Параметр {idx}'] = str(val).strip()
                    cur.execute(
                        "INSERT INTO products (group_id, category_id, title, specs, sort_order) VALUES (%s, %s, %s, %s, %s)",
                        (group_id, current_category_id, title, json.dumps(specs, ensure_ascii=False), sheet_products)
                    )
                    sheet_products += 1
                    stats['products'] += 1

        stats['sheets'].append({'sheet': sheet_name, 'categories': sheet_categories, 'products': sheet_products})

    conn.commit()
    cur.close()
    conn.close()

    return {
        'statusCode': 200,
        'headers': cors,
        'body': json.dumps({'ok': True, 'stats': stats}, ensure_ascii=False)
    }
