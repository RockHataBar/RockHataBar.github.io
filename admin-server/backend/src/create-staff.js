// One-off CLI to create the first owner account (or any account from the
// command line, before the staff-management UI has anyone to log in with).
// Run inside the backend container:
//   docker compose exec backend npm run create-staff -- username "Ім'я" owner
//   docker compose exec backend npm run create-staff -- username "Ім'я" owner СвійПароль
const bcrypt = require('bcryptjs');
const { pool } = require('./db');

async function main() {
  const [, , username, displayName, role, customPassword] = process.argv;
  if (!username || !displayName || !role) {
    console.error('Usage: create-staff <username> <"Display Name"> <owner|bartender> [password]');
    process.exit(1);
  }
  if (!['owner', 'bartender'].includes(role)) {
    console.error('role must be "owner" or "bartender"');
    process.exit(1);
  }

  const password = customPassword || require('crypto').randomBytes(9).toString('base64url');
  const hash = await bcrypt.hash(password, 10);

  await pool.query(
    `INSERT INTO staff (username, password_hash, display_name, role)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (username) DO UPDATE SET password_hash = $2, display_name = $3, role = $4`,
    [username, hash, displayName, role]
  );

  console.log(`\nAccount ready.\n  username: ${username}\n  password: ${password}\n\nSave this password now — it is not stored anywhere in readable form.\n`);
  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
