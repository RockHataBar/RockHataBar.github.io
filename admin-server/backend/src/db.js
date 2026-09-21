const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.PGHOST || 'db',
  port: Number(process.env.PGPORT || 5432),
  user: process.env.PGUSER || 'rockhata',
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE || 'rockhata',
});

module.exports = { pool };
