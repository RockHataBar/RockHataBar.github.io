const express = require('express');
const { pool } = require('../db');
const { requireAuth } = require('../auth');
const { publishMenuData } = require('../publish');

const router = express.Router();
router.use(requireAuth);

async function audit(staffId, action, itemId, detail) {
  await pool.query(
    'INSERT INTO audit_log (staff_id, action, item_id, detail) VALUES ($1, $2, $3, $4)',
    [staffId, action, itemId ?? null, detail ? JSON.stringify(detail) : null]
  );
}

// After any write, regenerate + push menu-data.js. A publish failure (e.g.
// no internet this second) doesn't roll back the DB write — the next
// successful save will carry the pending change through.
async function publishAndRespond(req, res, payload) {
  try {
    const staffLabel = `${req.staff.displayName} (${req.staff.role === 'owner' ? 'власниця' : 'бармен'})`;
    const result = await publishMenuData({ staffLabel });
    res.json({ ...payload, published: result.committed, sha: result.sha || null });
  } catch (err) {
    console.error('Publish failed:', err.message);
    res.json({ ...payload, published: false, publishError: err.message });
  }
}

router.get('/categories', async (req, res) => {
  const { rows: categories } = await pool.query('SELECT * FROM categories ORDER BY sort_order');
  const { rows: items } = await pool.query(
    `SELECT mi.*, s.display_name AS updated_by_name
     FROM menu_items mi
     LEFT JOIN staff s ON s.id = mi.updated_by
     ORDER BY mi.category_key, mi.sort_order, mi.id`
  );
  const byCategory = {};
  for (const cat of categories) byCategory[cat.key] = [];
  for (const item of items) (byCategory[item.category_key] ||= []).push(item);
  res.json({ categories: categories.map((c) => ({ ...c, items: byCategory[c.key] || [] })) });
});

// Bartender + owner: adjust the price of an existing item.
router.patch('/items/:id/price', async (req, res) => {
  const { price } = req.body || {};
  if (typeof price !== 'string' || !price.trim()) {
    return res.status(400).json({ error: 'Вкажіть ціну' });
  }
  const { rows } = await pool.query(
    'UPDATE menu_items SET price = $1, updated_by = $2, updated_at = now() WHERE id = $3 RETURNING *',
    [price.trim(), req.staff.sub, req.params.id]
  );
  if (!rows[0]) return res.status(404).json({ error: 'Товар не знайдено' });
  await audit(req.staff.sub, 'price_update', rows[0].id, { price });
  await publishAndRespond(req, res, { item: rows[0] });
});

// Bartender + owner: add a new item to an existing category.
router.post('/items', async (req, res) => {
  const { categoryKey, name, desc, volume, price, img, strength } = req.body || {};
  if (!categoryKey || !name || !name.trim()) {
    return res.status(400).json({ error: 'Вкажіть розділ і назву товару' });
  }
  const { rows: catRows } = await pool.query('SELECT 1 FROM categories WHERE key = $1', [categoryKey]);
  if (!catRows[0]) return res.status(400).json({ error: 'Невідомий розділ' });

  const { rows } = await pool.query(
    `INSERT INTO menu_items (category_key, name, desc_text, volume, price, img, strength, created_by, updated_by)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $8) RETURNING *`,
    [categoryKey, name.trim(), desc || '', volume || '', price || '', img || '', strength || null, req.staff.sub]
  );
  await audit(req.staff.sub, 'item_create', rows[0].id, { name });
  await publishAndRespond(req, res, { item: rows[0] });
});

// Bartender + owner: full edit of any field on an existing item.
router.put('/items/:id', async (req, res) => {
  const { name, desc, volume, price, img, strength, hit, boost, sortOrder } = req.body || {};
  const { rows } = await pool.query(
    `UPDATE menu_items SET
       name = COALESCE($1, name),
       desc_text = COALESCE($2, desc_text),
       volume = COALESCE($3, volume),
       price = COALESCE($4, price),
       img = COALESCE($5, img),
       strength = $6,
       hit = COALESCE($7, hit),
       boost = COALESCE($8, boost),
       sort_order = COALESCE($9, sort_order),
       updated_by = $10, updated_at = now()
     WHERE id = $11 RETURNING *`,
    [name, desc, volume, price, img, strength ?? null, hit, boost, sortOrder, req.staff.sub, req.params.id]
  );
  if (!rows[0]) return res.status(404).json({ error: 'Товар не знайдено' });
  await audit(req.staff.sub, 'item_update', rows[0].id, req.body);
  await publishAndRespond(req, res, { item: rows[0] });
});

// Bartender + owner: remove an item entirely.
router.delete('/items/:id', async (req, res) => {
  const { rows } = await pool.query('DELETE FROM menu_items WHERE id = $1 RETURNING id', [req.params.id]);
  if (!rows[0]) return res.status(404).json({ error: 'Товар не знайдено' });
  await audit(req.staff.sub, 'item_delete', Number(req.params.id), null);
  await publishAndRespond(req, res, { deleted: true });
});

module.exports = router;
