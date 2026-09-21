const express = require('express');
const bcrypt = require('bcryptjs');
const { pool } = require('../db');
const { signToken, requireAuth } = require('../auth');

const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ error: 'Введіть логін і пароль' });
  }

  const { rows } = await pool.query('SELECT * FROM staff WHERE username = $1', [username]);
  const staff = rows[0];
  if (!staff) return res.status(401).json({ error: 'Невірний логін або пароль' });

  const ok = await bcrypt.compare(password, staff.password_hash);
  if (!ok) return res.status(401).json({ error: 'Невірний логін або пароль' });

  const token = signToken(staff);
  res.json({
    token,
    staff: { id: staff.id, username: staff.username, displayName: staff.display_name, role: staff.role },
  });
});

router.get('/me', requireAuth, (req, res) => {
  res.json({ staff: req.staff });
});

module.exports = router;
