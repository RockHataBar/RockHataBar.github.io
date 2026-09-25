// Turns the DB into menu-data.js and pushes it to the live site's repo.
// The public site never talks to this server — it only reads the static
// file written here, so the menu keeps working when the Pi is offline.
const fs = require('fs');
const path = require('path');
const { execFile } = require('child_process');
const { promisify } = require('util');
const { query } = require('./db');

const execFileAsync = promisify(execFile);

const REPO_DIR = process.env.REPO_DIR || '/var/lib/rockhata/repo';
const REPO_URL = process.env.GITHUB_REPO_URL || 'https://github.com/RockHataBar/RockHataBar.github.io.git';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';
const GIT_BRANCH = process.env.GIT_BRANCH || 'main';
const GIT_NAME = process.env.GIT_AUTHOR_NAME || 'ROCK HATA Admin Panel';
const GIT_EMAIL = process.env.GIT_AUTHOR_EMAIL || 'admin-panel@rockhata.local';

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
// УВАГА: цей файл генерує адмін-панель на Raspberry Pi (admin-server/).
// Ручні правки тут буде перезаписано при наступному збереженні в панелі —
// змінюйте меню через панель.
`;

// Token goes in via env-provided git config, so it never lands in
// .git/config on disk or in the process list.
function gitEnv() {
  const env = {
    ...process.env,
    GIT_AUTHOR_NAME: GIT_NAME,
    GIT_AUTHOR_EMAIL: GIT_EMAIL,
    GIT_COMMITTER_NAME: GIT_NAME,
    GIT_COMMITTER_EMAIL: GIT_EMAIL,
    GIT_TERMINAL_PROMPT: '0',
  };
  if (GITHUB_TOKEN) {
    const basic = Buffer.from(`x-access-token:${GITHUB_TOKEN}`).toString('base64');
    env.GIT_CONFIG_COUNT = '1';
    env.GIT_CONFIG_KEY_0 = 'http.https://github.com/.extraheader';
    env.GIT_CONFIG_VALUE_0 = `Authorization: Basic ${basic}`;
  }
  return env;
}

function git(args, cwd = REPO_DIR) {
  return execFileAsync('git', args, { cwd, env: gitEnv() });
}

function jsString(value) {
  return String(value ?? '')
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/[\r\n]+/g, ' ');
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

function generateMenuDataJs() {
  const categories = query('SELECT key FROM categories ORDER BY sort_order').rows;
  const items = query('SELECT * FROM menu_items ORDER BY category_key, sort_order, id').rows;

  const byCategory = Object.fromEntries(categories.map((c) => [c.key, []]));
  for (const item of items) (byCategory[item.category_key] ||= []).push(item);

  const body = categories
    .map(({ key }) => {
      const lines = byCategory[key].map(serializeItem).join(',\n');
      return `  ${key}: [\n${lines}${lines ? '\n' : ''}  ]`;
    })
    .join(',\n');

  return `${HEADER}const menuData = {\n${body}\n};\n`;
}

// Any distinct value busts the cache; a timestamp never collides even with
// dozens of saves a day.
function bumpCacheBustVersion(html) {
  const stamp = new Date().toISOString().replace(/\D/g, '').slice(0, 14);
  return html.replace(/menu-data\.js\?v=[0-9a-z]+/, `menu-data.js?v=${stamp}`);
}

async function syncRepo() {
  if (!fs.existsSync(path.join(REPO_DIR, '.git'))) {
    fs.mkdirSync(path.dirname(REPO_DIR), { recursive: true });
    await git(['clone', '--depth', '1', '--branch', GIT_BRANCH, REPO_URL, REPO_DIR], path.dirname(REPO_DIR));
    return;
  }
  // The DB is the source of truth, so any local leftovers (e.g. a commit
  // whose push failed) are dropped and rebuilt on top of the latest remote.
  await git(['fetch', '--depth', '1', 'origin', GIT_BRANCH]);
  await git(['reset', '--hard', `origin/${GIT_BRANCH}`]);
}

async function doPublish() {
  await syncRepo();

  const menuDataPath = path.join(REPO_DIR, 'menu-data.js');
  const content = generateMenuDataJs();
  if (fs.existsSync(menuDataPath) && fs.readFileSync(menuDataPath, 'utf8') === content) {
    return { committed: false };
  }
  fs.writeFileSync(menuDataPath, content);

  const indexPath = path.join(REPO_DIR, 'index.html');
  fs.writeFileSync(indexPath, bumpCacheBustVersion(fs.readFileSync(indexPath, 'utf8')));

  await git(['add', 'menu-data.js', 'index.html']);
  await git(['commit', '-m', 'Admin panel: menu updated']);
  await git(['push', 'origin', `HEAD:${GIT_BRANCH}`]);
  return { committed: true };
}

// Publishes run one at a time. Saves that arrive while one is running share
// the next run — it reads the DB when it starts, so it includes them all.
let chain = Promise.resolve();
let queued = null;

function publishMenuData() {
  if (queued) return queued;
  queued = chain.then(() => {
    queued = null;
    return doPublish();
  });
  chain = queued.catch(() => {});
  return queued;
}

module.exports = { publishMenuData, generateMenuDataJs };
