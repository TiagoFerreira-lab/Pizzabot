# Pizzabot — Pizzaria Transalpina (Chatbot WhatsApp)

**Bot language:** PT-PT  
**Tone:** Texto + Emojis (amigável)

## Conteúdo
Repositório inicial com webhook e lógica básica para Pizzabot.
Deploy recomendado: **Vercel** (Functions).

## Quickstart (local)
1. Copia `.env.example` → `.env` e preenche com os valores reais.
2. Instala dependências:
   ```bash
   npm install
   ```
3. Testa localmente com Vercel CLI (recomendado) ou Node:
   ```bash
   vercel dev
   # ou (para testar rapidamente sem Vercel)
   node api/webhook.js
   ```
4. Testa verificação:
   ```bash
   curl "http://localhost:3000/api/webhook?hub.mode=subscribe&hub.verify_token=SEU_TOKEN&hub.challenge=12345"
   # deve responder apenas: 12345
   ```

## Deploy no Vercel
1. GitHub `TiagoFerreira-lab/Pizzabot` e faz push.
2. No Vercel: Import project from GitHub.
3. Configura Environment Variables no Vercel:
   - WHATSAPP_TOKEN
   - WHATSAPP_VERIFY_TOKEN 
   - PHONE_NUMBER_ID 
4. Deploy. Define Callback URL na Meta:
   `https://<your-vercel-project>.vercel.app/api/webhook`

## Menu e preços
O menu com os preços (fixos e personalizados) está em `src/config/menu.json`.

## Notas
- Estado atual é in-memory — para produção usa DB (Supabase/Postgres/Redis).
- Tokens não estão no repositório (use env vars).
- Contact: tiagodias_95@hotmail.com
- License: MIT
