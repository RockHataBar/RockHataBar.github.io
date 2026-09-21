const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;
if (!SECRET) {
  throw new Error('JWT_SECRET env var is required');
}

// One bar shift's worth of session — matches how the panel will actually be used.
const TOKEN_TTL = '10h';

function signToken(staff) {
  return jwt.sign(
    { sub: staff.id, username: staff.username, displayName: staff.display_name, role: staff.role },
    SECRET,
    { expiresIn: TOKEN_TTL }
  );
}

function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Not authenticated' });
  try {
    req.staff = jwt.verify(token, SECRET);
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired session' });
  }
}

function requireOwner(req, res, next) {
  if (req.staff?.role !== 'owner') {
    return res.status(403).json({ error: 'Тільки для власника' });
  }
  next();
}

module.exports = { signToken, requireAuth, requireOwner };
