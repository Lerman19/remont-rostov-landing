const http = require('http');

const PORT = Number(process.env.PORT || 3001);
const MAX_BOT_TOKEN = process.env.MAX_BOT_TOKEN || '';
const MAX_USER_ID = process.env.MAX_USER_ID || '';
const MAX_CHAT_ID = process.env.MAX_CHAT_ID || '';

function sendJson(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body)
  });
  res.end(body);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 20000) {
        reject(new Error('Payload too large'));
        req.destroy();
      }
    });

    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

function clean(value) {
  return String(value || '').trim().slice(0, 1000);
}

function buildLeadMessage(lead) {
  const lines = [
    'Новая заявка с сайта aaa-remont.ru',
    '',
    `Форма: ${clean(lead.source) || 'сайт'}`,
    `Имя: ${clean(lead.name) || 'не указано'}`,
    `Телефон: ${clean(lead.phone) || 'не указан'}`,
    `Объект: ${clean(lead.objectType) || 'не указан'}`,
    `Площадь: ${clean(lead.area) || 'не указана'} м2`,
    `Формат: ${clean(lead.repairType) || clean(lead.selectedPackage) || 'не указан'}`,
    `Дизайн-план: ${clean(lead.designNeed) || 'не указано'}`,
    '',
    clean(lead.estimate),
    '',
    `Комментарий: ${clean(lead.message) || 'нет'}`
  ];

  return lines.filter(Boolean).join('\n');
}

async function sendToMax(text) {
  if (!MAX_BOT_TOKEN || (!MAX_USER_ID && !MAX_CHAT_ID)) {
    throw new Error('MAX credentials are not configured');
  }

  const query = MAX_USER_ID
    ? `user_id=${encodeURIComponent(MAX_USER_ID)}`
    : `chat_id=${encodeURIComponent(MAX_CHAT_ID)}`;

  const response = await fetch(`https://platform-api.max.ru/messages?${query}`, {
    method: 'POST',
    headers: {
      'Authorization': MAX_BOT_TOKEN,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text })
  });

  if (!response.ok) {
    const details = await response.text().catch(() => '');
    throw new Error(`MAX API error ${response.status}: ${details}`);
  }

  return response.json().catch(() => ({}));
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end();
    return;
  }

  if (req.method !== 'POST' || req.url !== '/api/leads') {
    sendJson(res, 404, { ok: false, error: 'Not found' });
    return;
  }

  try {
    const rawBody = await readBody(req);
    const lead = JSON.parse(rawBody || '{}');
    const text = buildLeadMessage(lead);

    await sendToMax(text);
    sendJson(res, 200, { ok: true });
  } catch (error) {
    console.error(error);
    sendJson(res, 500, { ok: false, error: 'Lead delivery failed' });
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Lead server listening on 127.0.0.1:${PORT}`);
});
