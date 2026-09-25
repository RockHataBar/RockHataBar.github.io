const express = require('express');
const bcrypt = require('bcryptjs');
const { query } = require('../db');
const {
  signToken,
  requireAuth,
  loginBlockedFor,
  recordLoginFailure,
  clearLoginFailures,
} = require('../auth');

const router = express.Router();

router.post('/login', async (req, res) => {
  const username = String(req.body?.username || '').trim().toLowerCase();
  const password = String(req.body?.password || '');
  if (!username || !password) {
    return res.status(400).json({ error: 'Введіть логін і пароль' });
  }

  const blockedMs = loginBlockedFor(username);
  if (blockedMs) {
    const minutes = Math.ceil(blockedMs / 60000);
    return res.status(429).json({ error: `Забагато невдалих спроб. Спробуйте через ${minutes} хв.` });
  }

  const user = query('SELECT * FROM users WHERE username = ?', [username]).rows[0];
  const ok = user && (await bcrypt.compare(password, user.password_hash));
  if (!ok) {
    recordLoginFailure(username);
    return res.status(401).json({ error: 'Невірний логін або пароль' });
  }

  clearLoginFailures(username);
  res.json({
    token: signToken(user),
    user: { id: user.id, username: user.username, displayName: user.display_name },
  });
});

router.get('/me', requireAuth, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
