#!/bin/sh
set -e

echo "Waiting for database..."
until node -e "require('./src/db').pool.query('SELECT 1').then(()=>process.exit(0)).catch(()=>process.exit(1))"; do
  sleep 1
done

echo "Running migrations..."
node src/migrate.js

echo "Starting server..."
exec node src/index.js
