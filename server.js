const express = require('express');
const path = require('path');
const app = express();

const TRUSTED_IP = '5.29.13.210';
const REAL_PASSWORD = 'gayballs';
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

function getClientIp(req) {
  const xff = req.headers['x-forwarded-for'];
  if (xff) return xff.split(',')[0].trim();
  const ra = req.socket && req.socket.remoteAddress ? req.socket.remoteAddress : (req.ip || '');
  return ra.replace(/^::ffff:/, '');
}

app.get('/get-password', (req, res) => {
  const clientIp = getClientIp(req);
  if (clientIp === TRUSTED_IP) return res.json({ allowed: true, password: REAL_PASSWORD });
  return res.json({ allowed: false });
});

app.post('/check', (req, res) => {
  const attempt = String(req.body.password || '');
  if (attempt === REAL_PASSWORD) return res.json({ ok: true, redirect: 'https://www.youtube.com/watch?v=9BalEldzE8o' });
  return res.json({ ok: false });
});

app.listen(PORT, () => console.log('Listening on', PORT));
