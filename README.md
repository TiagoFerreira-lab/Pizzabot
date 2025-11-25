# Pizzabot — Chatbot para Pizzaria (WhatsApp Cloud API)

Repo inicial com webhook e lógica básica para **Pizzabot**.
Feito para deploy no Vercel (serverless function `api/webhook.js`).

## Features
- Webhook GET para verificação (hub.challenge)
- Webhook POST para receber mensagens da WhatsApp Cloud API
- Lógica de conversa modular (menu, pedido, pizza customizada, bebidas)
- Menu configurado em `src/config/menu.json`
- Envio de mensagens via Graph API (arquivo: `src/services/whatsapp.js`)
- State in-memory (para protótipo): `src/services/state.js`

## Requisitos
- Node.js 20.x
- Conta Meta (WhatsApp Cloud API) — Phone Number ID e token
- Conta Vercel para deploy

## Variáveis de ambiente
Copiar `.env.example` → `.env` e preencher:
- `WHATSAPP_TOKEN` (Bearer token)
- `WHATSAPP_VERIFY_TOKEN` (o verify token que vais usar na Meta)
- `PHONE_NUMBER_ID` (Phone Number ID)

> Nota: não comites `.env` para o GitHub.

## Testar localmente (dev)
1. `npm install`
2. `node api/webhook.js`
3. Testar a verificação com curl:
```bash
curl "http://localhost:3000/api/webhook?hub.mode=subscribe&hub.verify_token=SEU_TOKEN&hub.challenge=12345"
# deve responder apenas 12345
