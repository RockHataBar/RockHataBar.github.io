// Seeds the DB from the site's current menu-data.js. Refuses to run on a
// non-empty DB unless --replace is given, since after the first import the
// DB is the source of truth.
//   node src/import-existing.js /path/to/menu-data.js [--replace]
const fs = require('fs');
const { query, transaction } = require('./db');

const file = process.argv[2];
const replace = process.argv.includes('--replace');
if (!file) {
  console.error('Usage: import-existing <menu-data.js> [--replace]');
  process.exit(1);
}

const count = query('SELECT COUNT(*) AS n FROM menu_items').rows[0].n;
if (count > 0 && !replace) {
  console.log(`DB already has ${count} items — skipping import (use --replace to overwrite).`);
  process.exit(0);
}

const menuData = new Function(`${fs.readFileSync(file, 'utf8')}\nreturn menuData;`)();
const knownCategories = new Set(query('SELECT key FROM categories').rows.map((r) => r.key));

let imported = 0;
transaction(() => {
  if (replace) query('DELETE FROM menu_items');
  for (const [categoryKey, items] of Object.entries(menuData)) {
    if (!knownCategories.has(categoryKey)) {
      throw new Error(`Unknown category in menu-data.js: ${categoryKey}`);
    }
    items.forEach((item, sortOrder) => {
      query(
        `INSERT INTO menu_items (category_key, sort_order, name, desc_text, volume, price, img, strength, hit, boost)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          categoryKey,
          sortOrder,
          item.name || '',
          item.desc || '',
          item.volume || '',
          item.price || '',
          item.img || '',
          item.strength || null,
          item.hit ? 1 : 0,
          item.boost ? 1 : 0,
        ]
      );
      imported++;
    });
  }
});
console.log(`Imported ${imported} items.`);
