import conversationFlow from './steps/order.js';
import sendMessage from '../services/whatsapp.js';
import { log } from '../services/logger.js';

export default async function handleIncoming(body) {
  try {
    if (!body || body.object !== 'whatsapp_business_account') return;
    const entry = body.entry?.[0];
    if (!entry) return;

    for (const change of entry.changes || []) {
      const value = change.value || {};
      const messages = value.messages || [];
      for (const m of messages) {
        const from = m.from;
        const text = m.text?.body || '';
        log('info', `Incoming message from ${from}: ${text}`);
        const reply = await conversationFlow(from, text);
        if (reply) {
          await sendMessage(from, reply);
        }
      }
      const statuses = value.statuses || [];
      for (const s of statuses) log('info', 'Status event', s);
    }
  } catch (err) {
    log('error', 'router error', err);
  }
}
