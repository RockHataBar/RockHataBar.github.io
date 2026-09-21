// Applies migrations/*.sql in order. Safe to re-run — every statement in
// 001_init.sql uses IF NOT EXISTS / ON CONFLICT so it's idempotent.
const fs = require('fs');
const path = require('path');
const { pool } = require('./db');

async function main() {
  const dir = path.join(__dirname, '..', 'migrations');
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.sql')).sort();
  for (const file of files) {
    const sql = fs.readFileSync(path.join(dir, file), 'utf8');
    console.log(`Applying ${file}...`);
    await pool.query(sql);
  }
  console.log('Migrations done.');
  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
