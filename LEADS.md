# Telegram lead delivery

The landing page sends forms to:

```text
POST /api/leads
```

`server.js` receives the lead and forwards it to Telegram through the official Bot API.

Required environment variables:

```text
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=owner_or_group_chat_id
PORT=3001
```

Important:

- Do not put `TELEGRAM_BOT_TOKEN` into `index.html`.
- The owner must start the bot first, otherwise Telegram will not allow the bot to message them.
- Nginx must proxy `/api/leads` to `http://127.0.0.1:3001/api/leads`.

How to get credentials:

1. Open Telegram and message `@BotFather`.
2. Send `/newbot`.
3. Choose bot name and username.
4. Copy the token from BotFather into `TELEGRAM_BOT_TOKEN`.
5. Open the new bot and press Start.
6. Get the chat id through `https://api.telegram.org/bot<TOKEN>/getUpdates`.

