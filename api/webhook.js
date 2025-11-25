import verifyWebhook from '../src/chatbot/utils/verifyWebhook.js';
import handleIncoming from '../src/chatbot/router.js';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    return verifyWebhook(req, res);
  }

  if (req.method === 'POST') {
    // quick ack required by Meta
    res.status(200).send('EVENT_RECEIVED');
    try {
      const body = req.body || (await (async()=>{ let t=''; req.on('data',c=>t+=c); await new Promise(r=>req.on('end',r)); return JSON.parse(t) })());
      await handleIncoming(body);
    } catch (err) {
      console.error('Error processing webhook POST:', err);
    }
    return;
  }

  res.setHeader('Allow', ['GET','POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
