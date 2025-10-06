export default function handler(req, res) {
  const REAL_PASSWORD = process.env.REAL_PASSWORD;
  if (req.method !== "POST") return res.status(405).json({ ok: false });

  const body = req.body;
  if (!body || body.password !== REAL_PASSWORD) return res.json({ ok: false });
  res.json({
    ok: true,
    redirect: "https://www.youtube.com/watch?v=9BalEldzE8o",
  });
}
