const fs = require('fs');
const path = require('path');
const { DatabaseSync } = require('node:sqlite');

const DB_PATH = process.env.DB_PATH || '/var/lib/rockhata/rockhata.db';
fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

const db = new DatabaseSync(DB_PATH);
db.exec('PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON; PRAGMA busy_timeout = 5000;');

// Same { rows } shape the routes used with pg, so they read the same way.
function query(sql, params = []) {
  return { rows: db.prepare(sql).all(...params) };
}

function exec(sql) {
  db.exec(sql);
}

function transaction(fn) {
  db.exec('BEGIN');
  try {
    const result = fn();
    db.exec('COMMIT');
    return result;
  } catch (err) {
    db.exec('ROLLBACK');
    throw err;
  }
}

const NOW = "strftime('%Y-%m-%dT%H:%M:%fZ', 'now')";

module.exports = { db, query, exec, transaction, NOW };
