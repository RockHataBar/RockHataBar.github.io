// Sets the one panel login (creates it, or changes its password). The panel
// has a single user, so any other login is removed.
//   ADMIN_PASSWORD=... node src/set-password.js <login>
//   node src/set-password.js <login> <password>
const bcrypt = require('bcryptjs');
const { query, transaction } = require('./db');

const MIN_PASSWORD_LENGTH = 6;

const username = String(process.argv[2] || '').trim().toLowerCase();
const password = process.argv[3] || process.env.ADMIN_PASSWORD || '';

if (!username || !password) {
  console.error('Usage: ADMIN_PASSWORD=<password> set-password <login>');
  process.exit(1);
}
if (password.length < MIN_PASSWORD_LENGTH) {
  console.error(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 10);
transaction(() => {
  query('DELETE FROM users WHERE username <> ?', [username]);
  query(
    `INSERT INTO users (username, password_hash, display_name) VALUES (?, ?, ?)
     ON CONFLICT (username) DO UPDATE SET password_hash = excluded.password_hash`,
    [username, hash, username]
  );
});
console.log(`Login "${username}" is ready.`);
