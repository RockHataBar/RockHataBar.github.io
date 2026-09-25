-- Idempotent: safe to re-run on every start.

CREATE TABLE IF NOT EXISTS users (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  username      TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  display_name  TEXT NOT NULL,
  created_at    TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

-- key matches the section id used in index.html / menu-data.js.
CREATE TABLE IF NOT EXISTS categories (
  key         TEXT PRIMARY KEY,
  label       TEXT NOT NULL,
  sort_order  INTEGER NOT NULL
);

INSERT INTO categories (key, label, sort_order) VALUES
  ('cocktails',     'Коктейлі — Лонги',              1),
  ('shots',         'Коктейлі — Шоти',               2),
  ('strongAlcohol', 'Міцний алкоголь',               3),
  ('nastoyanky',    'Крафтові настоянки — Настоянки',4),
  ('liqueurs',      'Крафтові настоянки — Лікери',   5),
  ('beer',          'Пиво',                          6),
  ('wine',          'Вино',                          7),
  ('nonAlcohol',    'Безалкогольні напої',           8),
  ('snacks',        'Снеки',                         9),
  ('extras',        'Додатки',                       10)
ON CONFLICT (key) DO NOTHING;

CREATE TABLE IF NOT EXISTS menu_items (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  category_key  TEXT NOT NULL REFERENCES categories(key),
  sort_order    INTEGER NOT NULL DEFAULT 0,
  name          TEXT NOT NULL DEFAULT '',
  desc_text     TEXT NOT NULL DEFAULT '',
  volume        TEXT NOT NULL DEFAULT '',
  price         TEXT NOT NULL DEFAULT '',
  img           TEXT NOT NULL DEFAULT '',
  strength      INTEGER,
  hit           INTEGER NOT NULL DEFAULT 0,
  boost         INTEGER NOT NULL DEFAULT 0,
  updated_at    TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE INDEX IF NOT EXISTS menu_items_category_idx ON menu_items (category_key, sort_order);
