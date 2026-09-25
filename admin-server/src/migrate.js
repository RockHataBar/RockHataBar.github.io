const fs = require('fs');
const path = require('path');
const { exec } = require('./db');

const dir = path.join(__dirname, '..', 'migrations');
for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.sql')).sort()) {
  exec(fs.readFileSync(path.join(dir, file), 'utf8'));
}
console.log('Migrations done.');
