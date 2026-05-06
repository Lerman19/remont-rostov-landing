# AAA Remont landing

Landing page for turnkey apartment renovation services in Rostov-on-Don.

## What is included

- Static landing page in `index.html`.
- SEO files: `robots.txt`, `sitemap.xml`, Open Graph cover, favicon.
- Fast contact links for Telegram, WhatsApp, MAX, phone, and email.
- Lead forms that keep the visitor on the site.
- Node.js lead server in `server.js`.
- Telegram Bot API delivery for submitted leads.

## Production domain

```text
https://aaa-remont.ru
```

## Lead delivery

The frontend sends form data to:

```text
POST /api/leads
```

Nginx proxies this endpoint to:

```text
http://127.0.0.1:3001/api/leads
```

The Node.js service then sends the formatted lead to Telegram.

Required server environment variables:

```text
PORT=3001
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=owner_chat_id
```

Do not store real bot tokens in this repository.

## VPS deployment

Project path on the VPS:

```text
/var/www/aaa-remont
```

Lead service:

```text
aaa-remont-leads.service
```

Typical update flow:

```bash
git -C /var/www/aaa-remont pull --ff-only origin main
chown -R www-data:www-data /var/www/aaa-remont
systemctl restart aaa-remont-leads
nginx -t
systemctl reload nginx
```

## Repository

```text
https://github.com/Lerman19/remont-rostov-landing
```

