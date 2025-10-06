export default function handler(req, res) {
  const TRUSTED_IP = "5.29.13.210";
  const REAL_PASSWORD = process.env.REAL_PASSWORD || "gayballs";

  const clientIp =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket?.remoteAddress ||
    "";
  const normalizedIp = clientIp.replace(/^::ffff:/, "");

  if (normalizedIp === TRUSTED_IP) {
    res.status(200).json({ allowed: true, password: REAL_PASSWORD });
  } else {
    res.status(200).json({ allowed: false });
  }
}
