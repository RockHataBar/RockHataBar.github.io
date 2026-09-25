const express = require('express');
const { query, NOW } = require('../db');
const { requireAuth } = require('../auth');
const { publishMenuData } = require('../publish');

const router = express.Router();
router.use(requireAuth);

const TEXT_FIELDS = { name: 'name', desc: 'desc_text', volume: 'volume', price: 'price', img: 'img' };

// The site shows every price as "NN ₴"; accept "120", "120₴", "120 грн".
function normalizePrice(value) {
  const text = String(value ?? '').trim();
  const match = text.match(/^(\d+)\s*(₴|грн\.?)?$/i);
  return match ? `${match[1]} ₴` : text;
}

function cleanText(value) {
  return String(value ?? '').replace(/[\r\n]+/g, ' ').trim();
}

function toApiItem(row) {
  return { ...row, hit: !!row.hit, boost: !!row.boost };
}

// A failed publish (e.g. Wi-Fi blip) doesn't undo the DB write — the next
// successful publish regenerates menu-data.js from the DB and carries it.
async function publishAndRespond(res, payload) {
  try {
    const result = await publishMenuData();
    res.json({ ...payload, published: true, changed: result.committed });
  } catch (err) {
    console.error('Publish failed:', err.message);
    res.json({ ...payload, published: false, publishError: 'Збережено, але не вдалося опублікувати на сайт. Спробуйте зберегти ще раз трохи пізніше.' });
  }
}

router.get('/categories', (req, res) => {
  const categories = query('SELECT * FROM categories ORDER BY sort_order').rows;
  const items = query('SELECT * FROM menu_items ORDER BY category_key, sort_order, id').rows;
  const byCategory = Object.fromEntries(categories.map((c) => [c.key, []]));
  for (const item of items) (byCategory[item.category_key] ||= []).push(toApiItem(item));
  res.json({ categories: categories.map((c) => ({ ...c, items: byCategory[c.key] || [] })) });
});

router.post('/items', async (req, res) => {
  const { categoryKey } = req.body || {};
  const name = cleanText(req.body?.name);
  if (!categoryKey || !name) {
    return res.status(400).json({ error: 'Вкажіть розділ і назву товару' });
  }
  if (!query('SELECT 1 FROM categories WHERE key = ?', [categoryKey]).rows[0]) {
    return res.status(400).json({ error: 'Невідомий розділ' });
  }

  const [item] = query(
    `INSERT INTO menu_items (category_key, sort_order, name, desc_text, volume, price, img)
     VALUES (?, (SELECT COALESCE(MAX(sort_order), -1) + 1 FROM menu_items WHERE category_key = ?), ?, ?, ?, ?, ?)
     RETURNING *`,
    [
      categoryKey,
      categoryKey,
      name,
      cleanText(req.body.desc),
      cleanText(req.body.volume),
      normalizePrice(req.body.price),
      cleanText(req.body.img),
    ]
  ).rows;
  await publishAndRespond(res, { item: toApiItem(item) });
});

// Only the fields present in the body are changed, so editing the name
// never wipes strength/hit/boost that the panel doesn't show.
router.put('/items/:id', async (req, res) => {
  const body = req.body || {};
  const sets = [];
  const params = [];

  for (const [field, column] of Object.entries(TEXT_FIELDS)) {
    if (!(field in body)) continue;
    const value = field === 'price' ? normalizePrice(body[field]) : cleanText(body[field]);
    if (field === 'name' && !value) return res.status(400).json({ error: 'Назва не може бути порожньою' });
    sets.push(`${column} = ?`);
    params.push(value);
  }
  if ('strength' in body) {
    const strength = body.strength === null || body.strength === '' ? null : Number(body.strength);
    if (strength !== null && ![1, 2, 3].includes(strength)) {
      return res.status(400).json({ error: 'Міцність має бути 1, 2 або 3' });
    }
    sets.push('strength = ?');
    params.push(strength);
  }
  for (const flag of ['hit', 'boost']) {
    if (!(flag in body)) continue;
    sets.push(`${flag} = ?`);
    params.push(body[flag] ? 1 : 0);
  }
  if (!sets.length) return res.status(400).json({ error: 'Немає змін' });

  const [item] = query(
    `UPDATE menu_items SET ${sets.join(', ')}, updated_at = ${NOW} WHERE id = ? RETURNING *`,
    [...params, req.params.id]
  ).rows;
  if (!item) return res.status(404).json({ error: 'Товар не знайдено' });
  await publishAndRespond(res, { item: toApiItem(item) });
});

router.delete('/items/:id', async (req, res) => {
  const [deleted] = query('DELETE FROM menu_items WHERE id = ? RETURNING id', [req.params.id]).rows;
  if (!deleted) return res.status(404).json({ error: 'Товар не знайдено' });
  await publishAndRespond(res, { deleted: true });
});

module.exports = router;
