// One-off: seeds the DB from the repo's current menu-data.js. Not used in
// production after the first import — from then on the DB is the source of
// truth and publish.js writes menu-data.js, not the other way around.
const fs = require('fs');
const { pool } = require('./db');

async function main() {
  const file = process.argv[2];
  const src = fs.readFileSync(file, 'utf8');
  const menuData = new Function(`${src}\nreturn menuData;`)();

  for (const [categoryKey, items] of Object.entries(menuData)) {
    let sortOrder = 0;
    for (const item of items) {
      await pool.query(
        `INSERT INTO menu_items (category_key, sort_order, name, desc_text, volume, price, img, strength, hit, boost)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
        [categoryKey, sortOrder++, item.name, item.desc || '', item.volume || '', item.price || '', item.img || '', item.strength || null, !!item.hit, !!item.boost]
      );
    }
  }
  console.log('Imported.');
  await pool.end();
}

main().catch((err) => { console.error(err); process.exit(1); });
