# MAX lead delivery

The landing page sends forms to:

```text
POST /api/leads
```

`server.js` receives the lead and forwards it to MAX through the official Bot API.

Required environment variables:

```text
MAX_BOT_TOKEN=your_max_bot_token
MAX_USER_ID=owner_max_user_id
PORT=3001
```

Instead of `MAX_USER_ID`, you can use:

```text
MAX_CHAT_ID=target_chat_id
```

Important:

- Do not put `MAX_BOT_TOKEN` into `index.html`.
- The owner must create a MAX bot and allow it to message the target user/chat.
- Nginx must proxy `/api/leads` to `http://127.0.0.1:3001/api/leads`.

