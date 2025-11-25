import axios from 'axios';
import { log } from './logger.js';
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;
const TOKEN = process.env.WHATSAPP_TOKEN;

export default async function sendMessage(to, text) {
  if (!TOKEN || !PHONE_NUMBER_ID) {
    log('warn', 'WHATSAPP_TOKEN or PHONE_NUMBER_ID not set. Skipping sendMessage.');
    return;
  }
  const url = `https://graph.facebook.com/v17.0/${PHONE_NUMBER_ID}/messages`;
  const payload = {
    messaging_product: 'whatsapp',
    to,
    type: 'text',
    text: { body: text }
  };
  try {
    const resp = await axios.post(url, payload, {
      headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' }
    });
    log('info', 'Message sent', resp.data);
    return resp.data;
  } catch (err) {
    log('error', 'Error sending message', err?.response?.data || err.message);
    throw err;
  }
}
