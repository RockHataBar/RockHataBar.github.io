// Turns the current DB state into menu-data.js and pushes it straight to
// the live site's repo. The public site never talks to this server — it
// only ever reads the static file this writes, so the menu keeps working
// even when the bar (and this container) is offline.
const fs = require('fs');
const path = require('path');
const { execFile } = require('child_process');
const { promisify } = require('util');
const { pool } = require('./db');

const execFileAsync = promisify(execFile);

const REPO_DIR = process.env.REPO_DIR || '/repo';
const REPO_URL = process.env.GITHUB_REPO_URL; // e.g. https://github.com/RockHataBar/RockHataBar.github.io.git
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GIT_BRANCH = process.env.GIT_BRANCH || 'main';
const GIT_AUTHOR_NAME = process.env.GIT_AUTHOR_NAME || 'ROCK HATA Admin Panel';
const GIT_AUTHOR_EMAIL = process.env.GIT_AUTHOR_EMAIL || 'admin-panel@rockhata.local';

const HEADER = `// Щоб позиція частіше траплялася у боті-порадники напоїв (за настроєм) —
// додайте їй поле boost: true, наприклад:
// { name: 'ROSO TONIC', ..., boost: true }
//
// Поле strength (1-3) — міцність напою для міні-індикатора біля назви
// (▪▪▫ тощо). 1 = легкий, 2 = середній, 3 = міцний. Не додавайте його
// безалкогольним позиціям, снекам і додаткам — індикатор для них не
// показується.
//
// Поле hit: true — позначає хіт розділу (1-2 позиції на розділ):
// назва виводиться крупніше, з лейблом "Хіт бару" і товщим
// роздільником зверху, щоб виділятись серед списку.
//
// Цей файл генерується адмін-панеллю (admin-server). Ручні правки тут
// переживуть до наступного збереження в панелі, а потім будуть
// перезаписані — редагуйте меню через панель, не тут.
`;

function jsString(value) {
  return String(value ?? '')
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'");
}

function serializeItem(item) {
  const parts = [
    `name: '${jsString(item.name)}'`,
    `desc: '${jsString(item.desc_text)}'`,
    `volume: '${jsString(item.volume)}'`,
    `price: '${jsString(item.price)}'`,
    `img: '${jsString(item.img)}'`,
  ];
  if (item.strength) parts.push(`strength: ${Number(item.strength)}`);
  if (item.hit) parts.push('hit: true');
  if (item.boost) parts.push('boost: true');
  return `    { ${parts.join(', ')} }`;
}

async function generateMenuDataJs() {
  const { rows: categories } = await pool.query(
    'SELECT key FROM categories ORDER BY sort_order'
  );
  const { rows: items } = await pool.query(
    'SELECT * FROM menu_items ORDER BY category_key, sort_order, id'
  );

  const byCategory = {};
  for (const cat of categories) byCategory[cat.key] = [];
  for (const item of items) {
    (byCategory[item.category_key] ||= []).push(item);
  }

  const body = categories
    .map(({ key }) => {
      const lines = byCategory[key].map(serializeItem).join(',\n');
      return `  ${key}: [\n${lines}${lines ? '\n  ' : ''}]`;
    })
    .join(',\n');

  return `${HEADER}const menuData = {\n${body}\n};\n`;
}

async function ensureRepoClone() {
  if (fs.existsSync(path.join(REPO_DIR, '.git'))) return;
  if (!REPO_URL || !GITHUB_TOKEN) {
    throw new Error('GITHUB_REPO_URL and GITHUB_TOKEN must be set to publish');
  }
  const authedUrl = REPO_URL.replace(
    'https://',
    `https://x-access-token:${GITHUB_TOKEN}@`
  );
  await execFileAsync('git', ['clone', '--branch', GIT_BRANCH, authedUrl, REPO_DIR]);
  await execFileAsync('git', ['config', 'user.name', GIT_AUTHOR_NAME], { cwd: REPO_DIR });
  await execFileAsync('git', ['config', 'user.email', GIT_AUTHOR_EMAIL], { cwd: REPO_DIR });
}

// Same cache-busting scheme index.html already uses (?v=YYYYMMDDx).
function bumpCacheBustVersion(indexHtmlPath) {
  const html = fs.readFileSync(indexHtmlPath, 'utf8');
  const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const re = /menu-data\.js\?v=([0-9a-z]+)/;
  const match = html.match(re);
  if (!match) return html;
  let next = today;
  if (match[1].startsWith(today)) {
    const suffix = match[1].slice(today.length);
    const nextChar = suffix ? String.fromCharCode(suffix.charCodeAt(0) + 1) : 'b';
    next = `${today}${nextChar}`;
  }
  return html.replace(re, `menu-data.js?v=${next}`);
}

// Returns { committed: boolean, sha?: string }. Never throws for "nothing to
// commit" — that's a normal outcome when a save didn't actually change data.
async function publishMenuData({ staffLabel }) {
  await ensureRepoClone();
  await execFileAsync('git', ['pull', '--ff-only', 'origin', GIT_BRANCH], { cwd: REPO_DIR });

  const menuDataPath = path.join(REPO_DIR, 'menu-data.js');
  const content = await generateMenuDataJs();
  const unchanged = fs.existsSync(menuDataPath) && fs.readFileSync(menuDataPath, 'utf8') === content;
  if (unchanged) {
    // Nothing actually changed since the last publish — don't bump the
    // cache-bust version or touch index.html for no reason.
    return { committed: false };
  }
  fs.writeFileSync(menuDataPath, content);

  const indexPath = path.join(REPO_DIR, 'index.html');
  fs.writeFileSync(indexPath, bumpCacheBustVersion(indexPath));

  await execFileAsync('git', ['add', 'menu-data.js', 'index.html'], { cwd: REPO_DIR });
  const { stdout: statusOut } = await execFileAsync('git', ['status', '--porcelain'], { cwd: REPO_DIR });
  if (!statusOut.trim()) {
    return { committed: false };
  }

  const message = `Admin panel: ${staffLabel} updated the menu`;
  await execFileAsync('git', ['commit', '-m', message], { cwd: REPO_DIR });
  await execFileAsync('git', ['push', 'origin', `HEAD:${GIT_BRANCH}`], { cwd: REPO_DIR });
  const { stdout: shaOut } = await execFileAsync('git', ['rev-parse', 'HEAD'], { cwd: REPO_DIR });
  return { committed: true, sha: shaOut.trim() };
}

module.exports = { publishMenuData, generateMenuDataJs };
