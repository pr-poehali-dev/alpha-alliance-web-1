import json
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка заявки с сайта на почту alfaallianse-info@mail.ru"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    body = json.loads(event.get('body', '{}'))
    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()

    if not name or not phone:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Имя и телефон обязательны'})
        }

    smtp_password = os.environ['SMTP_PASSWORD']
    sender = 'alfaallianse-info@mail.ru'
    recipient = 'alfaallianse-info@mail.ru'

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новая заявка с сайта от {name}'
    msg['From'] = sender
    msg['To'] = recipient

    html = f"""
    <html>
    <body style="font-family: Arial, sans-serif; color: #333; max-width: 600px;">
        <h2 style="color: #c0392b;">Новая заявка с сайта Альфа Альянс</h2>
        <table style="width:100%; border-collapse: collapse;">
            <tr>
                <td style="padding: 10px; border: 1px solid #ddd; background: #f9f9f9; font-weight: bold; width: 40%;">Имя</td>
                <td style="padding: 10px; border: 1px solid #ddd;">{name}</td>
            </tr>
            <tr>
                <td style="padding: 10px; border: 1px solid #ddd; background: #f9f9f9; font-weight: bold;">Телефон</td>
                <td style="padding: 10px; border: 1px solid #ddd;">{phone}</td>
            </tr>
        </table>
    </body>
    </html>
    """

    msg.attach(MIMEText(html, 'html'))

    with smtplib.SMTP_SSL('smtp.mail.ru', 465) as server:
        server.login(sender, smtp_password)
        server.sendmail(sender, recipient, msg.as_string())

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'success': True})
    }
