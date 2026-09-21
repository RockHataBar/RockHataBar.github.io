-- Staff accounts. role: 'owner' (full access) or 'bartender' (price + new items only).
CREATE TABLE IF NOT EXISTS staff (
  id            SERIAL PRIMARY KEY,
  username      TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  display_name  TEXT NOT NULL,
  role          TEXT NOT NULL CHECK (role IN ('owner', 'bartender')),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Menu categories, in display order. key matches the section id used in index.html/menu-data.js.
CREATE TABLE IF NOT EXISTS categories (
  key         TEXT PRIMARY KEY,
  label       TEXT NOT NULL,
  sort_order  INTEGER NOT NULL
);

INSERT INTO categories (key, label, sort_order) VALUES
  ('cocktails',     'Коктейлі — Лонги/Шоти',        1),
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
  id            SERIAL PRIMARY KEY,
  category_key  TEXT NOT NULL REFERENCES categories(key),
  sort_order    INTEGER NOT NULL DEFAULT 0,
  name          TEXT NOT NULL DEFAULT '',
  desc_text     TEXT NOT NULL DEFAULT '',
  volume        TEXT NOT NULL DEFAULT '',
  price         TEXT NOT NULL DEFAULT '',
  img           TEXT NOT NULL DEFAULT '',
  strength      SMALLINT,
  hit           BOOLEAN NOT NULL DEFAULT false,
  boost         BOOLEAN NOT NULL DEFAULT false,
  created_by    INTEGER REFERENCES staff(id),
  updated_by    INTEGER REFERENCES staff(id),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS menu_items_category_idx ON menu_items (category_key, sort_order);

-- Every write goes here too, so "who changed what" is always answerable later.
CREATE TABLE IF NOT EXISTS audit_log (
  id          SERIAL PRIMARY KEY,
  staff_id    INTEGER REFERENCES staff(id),
  action      TEXT NOT NULL,
  item_id     INTEGER,
  detail      JSONB,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
