export default function verifyWebhook(req, res) {
  const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;
  const mode = req.query?.['hub.mode'] || req.url && (new URL(req.url, 'http://localhost')).searchParams.get('hub.mode');
  const token = req.query?.['hub.verify_token'] || req.url && (new URL(req.url, 'http://localhost')).searchParams.get('hub.verify_token');
  const challenge = req.query?.['hub.challenge'] || req.url && (new URL(req.url, 'http://localhost')).searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('WEBHOOK_VERIFIED');
    res.status(200).send(challenge);
    return;
  }
  res.status(403).send('Forbidden');
}
