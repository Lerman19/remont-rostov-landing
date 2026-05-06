# Ремонт Ростов Под ключ — лендинг

Сайт-витрина услуги "ремонт под ключ" для Ростова-на-Дону.

## Что уже настроено

- Лендинг на одном `index.html`
- Авто-отправка заявок через:
  - Telegram (username или endpoint)
  - WhatsApp (номер)
  - CRM endpoint (POST JSON)
- SEO-блоки: Open Graph, Twitter Card, JSON-LD, keywords, canonical
- `robots.txt` и `sitemap.xml`
- Favicon и OG-обложка (`favicon.svg`, `og-cover.svg`)
- GitHub Pages workflow (`.github/workflows/deploy-pages.yml`)

## Как быстро подключить заявки

Откройте блок `leadConfig` в `index.html`:

```js
const leadConfig = {
  telegram: {
    username: "",
    endpoint: "",
  },
  whatsapp: {
    number: "",
  },
  crm: {
    endpoint: "",
    headers: {},
  },
};
```

- `telegram.username`: имя пользователя Telegram, например `@mycompany`.  
  Будет открываться `t.me` с автозаполненным сообщением.
- `whatsapp.number`: номер в формате `79831234567`.
- `crm.endpoint`: ваш вебхук для приёма заявки (JSON POST).

## Как добавить в продакшн-CRM

Лид отправляется в формате:

```json
{
  "name": "Имя",
  "phone": "+7 ...",
  "object": "Адрес объекта",
  "budget": "1000000",
  "source": "landing-rostov",
  "pageUrl": "...",
  "createdAt": "ISO"
}
```

Поддерживаемые заголовки: можно добавить в `leadConfig.crm.headers`.

## Деплой

1. Репозиторий уже подключен к GitHub:
   - `Lerman19/remont-rostov-landing`
2. После пуша в `main` Actions автоматически собирает и публикует Pages.
3. Текущий URL проекта:
   - https://lerman19.github.io/remont-rostov-landing/
4. Для кастомного домена:
   - добавьте его в `Settings -> Pages` репозитория.

## Что еще нужно заменить перед запуском

- Реальные телефоны и email
- Реальные фотографии/портфолио
- Реальные контакты Telegram/WhatsApp
- Настоящий CRM endpoint
- Тексты маркетинга под вашу уникальную подачу
- Реальные юридические контакты в политике конфиденциальности
