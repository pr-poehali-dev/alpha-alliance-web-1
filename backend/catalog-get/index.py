import json
import os
import psycopg2


def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])


def handler(event: dict, context) -> dict:
    """Возвращает список групп, категорий и товаров из БД."""
    cors = {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type'}

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors, 'body': ''}

    params = event.get('queryStringParameters') or {}
    group_slug = params.get('group')

    conn = get_conn()
    cur = conn.cursor()

    # Получаем группы
    cur.execute("SELECT id, name, slug, sort_order FROM product_groups ORDER BY sort_order, name")
    groups = [{'id': r[0], 'name': r[1], 'slug': r[2]} for r in cur.fetchall()]

    result = {'groups': groups, 'categories': [], 'products': []}

    if group_slug:
        cur.execute("SELECT id FROM product_groups WHERE slug = %s", (group_slug,))
        row = cur.fetchone()
        if row:
            group_id = row[0]
            cur.execute("SELECT id, name FROM product_categories WHERE group_id = %s ORDER BY sort_order, name", (group_id,))
            result['categories'] = [{'id': r[0], 'name': r[1]} for r in cur.fetchall()]

            cur.execute(
                "SELECT p.id, p.title, p.specs, c.name as category "
                "FROM products p LEFT JOIN product_categories c ON p.category_id = c.id "
                "WHERE p.group_id = %s ORDER BY p.sort_order, p.title",
                (group_id,)
            )
            result['products'] = [
                {'id': r[0], 'title': r[1], 'specs': r[2], 'category': r[3]}
                for r in cur.fetchall()
            ]

    cur.close()
    conn.close()

    return {'statusCode': 200, 'headers': cors, 'body': json.dumps(result, ensure_ascii=False)}
