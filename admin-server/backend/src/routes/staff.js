const express = require('express');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { pool } = require('../db');
const { requireAuth, requireOwner } = require('../auth');

const router = express.Router();
router.use(requireAuth, requireOwner);

router.get('/', async (req, res) => {
  const { rows } = await pool.query(
    'SELECT id, username, display_name, role, created_at FROM staff ORDER BY created_at'
  );
  res.json({ staff: rows });
});

// Creates an account and returns the one-time generated password. It is
// never stored in readable form or shown again after this response.
router.post('/', async (req, res) => {
  const { username, displayName, role } = req.body || {};
  if (!username || !displayName || !['owner', 'bartender'].includes(role)) {
    return res.status(400).json({ error: "Вкажіть логін, ім'я та роль" });
  }
  const password = crypto.randomBytes(9).toString('base64url');
  const hash = await bcrypt.hash(password, 10);
  try {
    const { rows } = await pool.query(
      `INSERT INTO staff (username, password_hash, display_name, role)
       VALUES ($1, $2, $3, $4) RETURNING id, username, display_name, role`,
      [username.trim(), hash, displayName.trim(), role]
    );
    res.json({ staff: rows[0], password });
  } catch (err) {
    if (err.code === '23505') return res.status(409).json({ error: 'Такий логін вже існує' });
    throw err;
  }
});

router.delete('/:id', async (req, res) => {
  if (Number(req.params.id) === req.staff.sub) {
    return res.status(400).json({ error: 'Не можна видалити власний акаунт' });
  }
  await pool.query('DELETE FROM staff WHERE id = $1', [req.params.id]);
  res.json({ deleted: true });
});

module.exports = router;
