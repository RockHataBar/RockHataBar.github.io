const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;
if (!SECRET) {
  throw new Error('JWT_SECRET env var is required');
}

// Only the director uses the panel, from her own phone/laptop.
const TOKEN_TTL = '30d';

function signToken(user) {
  return jwt.sign(
    { sub: user.id, username: user.username, displayName: user.display_name },
    SECRET,
    { expiresIn: TOKEN_TTL }
  );
}

function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Потрібно увійти' });
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    return res.status(401).json({ error: 'Сесія закінчилась — увійдіть знову' });
  }
}

// The Funnel URL is public, so failed logins are throttled. Counted per
// username rather than per IP: behind the tunnel every request comes from
// localhost.
const MAX_FAILURES = 5;
const WINDOW_MS = 15 * 60 * 1000;
const failures = new Map();

function loginBlockedFor(username) {
  const entry = failures.get(username);
  if (!entry) return 0;
  const remaining = entry.firstAt + WINDOW_MS - Date.now();
  if (remaining <= 0) {
    failures.delete(username);
    return 0;
  }
  return entry.count >= MAX_FAILURES ? remaining : 0;
}

function recordLoginFailure(username) {
  const entry = failures.get(username);
  if (!entry || entry.firstAt + WINDOW_MS <= Date.now()) {
    failures.set(username, { count: 1, firstAt: Date.now() });
  } else {
    entry.count += 1;
  }
}

function clearLoginFailures(username) {
  failures.delete(username);
}

module.exports = {
  signToken,
  requireAuth,
  loginBlockedFor,
  recordLoginFailure,
  clearLoginFailures,
};
