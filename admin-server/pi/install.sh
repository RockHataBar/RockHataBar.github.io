#!/usr/bin/env bash
# Устанавливает или обновляет админку меню ROCK HATA на Raspberry Pi.
#
#   sudo bash admin-server/pi/install.sh              установка / обновление
#   sudo bash admin-server/pi/install.sh --password   сменить логин/пароль
#   sudo bash admin-server/pi/install.sh --token      заменить GitHub-токен
#
# Повторный запуск безопасен: уже настроенные токен, база и пароль
# остаются как есть.
set -euo pipefail

APP_DIR=/opt/rockhata-admin
DATA_DIR=/var/lib/rockhata
ENV_DIR=/etc/rockhata
ENV_FILE=$ENV_DIR/admin.env
APP_USER=rockhata
SERVICE=rockhata-admin
PORT=3000
REPO_URL=https://github.com/RockHataBar/RockHataBar.github.io.git
REPO_API=https://api.github.com/repos/RockHataBar/RockHataBar.github.io
MIN_NODE_MAJOR=22
MIN_NODE_MINOR=13

SRC_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REPO_ROOT="$(cd "$SRC_DIR/.." && pwd)"

ASK_TOKEN=0
ASK_PASSWORD=0
for arg in "$@"; do
  case "$arg" in
    --token) ASK_TOKEN=1 ;;
    --password) ASK_PASSWORD=1 ;;
    *) echo "Неизвестный параметр: $arg" >&2; exit 1 ;;
  esac
done

step() { printf '\n\033[1;33m==> %s\033[0m\n' "$*"; }
ok()   { printf '\033[1;32m    %s\033[0m\n' "$*"; }
die()  { printf '\n\033[1;31mОшибка: %s\033[0m\n' "$*" >&2; exit 1; }

# Runs node as the service user with the service's environment.
run_app() {
  (
    set -a
    # shellcheck disable=SC1090
    . "$ENV_FILE"
    set +a
    cd "$APP_DIR"
    runuser -u "$APP_USER" -- "$NODE_BIN" --disable-warning=ExperimentalWarning "$@"
  )
}

# ---------------------------------------------------------------- проверки
[ "$(id -u)" -eq 0 ] || die "запустите через sudo: sudo bash $0"
[ "$(uname -m)" = "aarch64" ] || die "нужна 64-битная система. Запишите на карту «Raspberry Pi OS Lite (64-bit)»."
[ -f "$SRC_DIR/package.json" ] || die "не найден $SRC_DIR/package.json — запускайте скрипт из клона репозитория."

# ---------------------------------------------------------------- пакеты
step "Устанавливаю системные пакеты (git, curl)…"
apt-get update -qq
apt-get install -y -qq git curl ca-certificates openssl >/dev/null
ok "готово"

node_ok() {
  command -v node >/dev/null 2>&1 || return 1
  local v major minor
  v="$(node -p 'process.versions.node')"
  major="${v%%.*}"; minor="$(echo "$v" | cut -d. -f2)"
  [ "$major" -gt "$MIN_NODE_MAJOR" ] || { [ "$major" -eq "$MIN_NODE_MAJOR" ] && [ "$minor" -ge "$MIN_NODE_MINOR" ]; }
}

if node_ok; then
  ok "Node.js $(node -v) уже установлен"
else
  step "Устанавливаю Node.js 24 LTS (займёт несколько минут)…"
  curl -fsSL https://deb.nodesource.com/setup_24.x | bash - >/dev/null
  apt-get install -y -qq nodejs >/dev/null
  node_ok || die "не удалось установить Node.js ${MIN_NODE_MAJOR}.${MIN_NODE_MINOR}+"
  ok "Node.js $(node -v)"
fi
NODE_BIN="$(command -v node)"

# ---------------------------------------------------------------- пользователь и папки
step "Копирую программу в $APP_DIR…"
id -u "$APP_USER" >/dev/null 2>&1 || useradd --system --home-dir "$DATA_DIR" --shell /usr/sbin/nologin "$APP_USER"
install -d -m 755 "$APP_DIR"
install -d -m 700 -o "$APP_USER" -g "$APP_USER" "$DATA_DIR"
install -d -m 700 "$ENV_DIR"
rm -rf "$APP_DIR/src" "$APP_DIR/migrations" "$APP_DIR/public"
cp -r "$SRC_DIR/package.json" "$SRC_DIR/package-lock.json" "$SRC_DIR/src" "$SRC_DIR/migrations" "$SRC_DIR/public" "$APP_DIR/"
(cd "$APP_DIR" && npm ci --omit=dev --no-audit --no-fund --loglevel=error)
ok "готово"

# ---------------------------------------------------------------- GitHub-токен
read_token() {
  echo
  echo "Нужен GitHub-токен, чтобы админка могла публиковать меню на сайт."
  echo "Создать: github.com → Settings → Developer settings → Personal access tokens →"
  echo "Fine-grained tokens → Generate new token → Only select repositories →"
  echo "RockHataBar.github.io → Permissions: Contents = Read and write."
  echo "(При вставке символы не отображаются — это нормально.)"
  local token
  while true; do
    read -rsp "Вставьте токен и нажмите Enter: " token </dev/tty; echo
    token="$(printf '%s' "$token" | tr -d '[:space:]')"
    if ! [[ "$token" =~ ^[A-Za-z0-9_]{20,}$ ]]; then
      echo "Это не похоже на токен (ожидается github_pat_… или ghp_…). Попробуйте ещё раз."
      continue
    fi
    local code
    code="$(curl -s -o /dev/null -w '%{http_code}' -H "Authorization: Bearer $token" "$REPO_API")"
    if [ "$code" = "200" ]; then
      TOKEN="$token"
      return
    fi
    echo "GitHub не принял токен (код $code). Проверьте, что он создан для репозитория RockHataBar.github.io, и вставьте ещё раз."
  done
}

write_env() {
  local jwt="$1" token="$2"
  umask 077
  cat >"$ENV_FILE" <<EOF
JWT_SECRET=$jwt
GITHUB_TOKEN=$token
GITHUB_REPO_URL=$REPO_URL
GIT_BRANCH=main
DB_PATH=$DATA_DIR/rockhata.db
REPO_DIR=$DATA_DIR/repo
PORT=$PORT
HOST=127.0.0.1
EOF
  chmod 600 "$ENV_FILE"
}

if [ ! -f "$ENV_FILE" ]; then
  step "Настройка доступа к GitHub"
  read_token
  write_env "$(openssl rand -hex 32)" "$TOKEN"
  ok "токен сохранён в $ENV_FILE (доступен только root)"
elif [ "$ASK_TOKEN" -eq 1 ]; then
  step "Замена GitHub-токена"
  read_token
  write_env "$(grep '^JWT_SECRET=' "$ENV_FILE" | cut -d= -f2-)" "$TOKEN"
  ok "новый токен сохранён"
else
  ok "GitHub-токен уже настроен (заменить: sudo bash $0 --token)"
fi

# ---------------------------------------------------------------- база
step "Готовлю базу данных…"
run_app src/migrate.js >/dev/null
SEED="$DATA_DIR/seed-menu-data.js"
install -m 600 -o "$APP_USER" -g "$APP_USER" "$REPO_ROOT/menu-data.js" "$SEED"
run_app src/import-existing.js "$SEED"
rm -f "$SEED"

USER_COUNT="$(run_app -e "console.log(require('./src/db').query('SELECT COUNT(*) AS n FROM users').rows[0].n)")"
if [ "$USER_COUNT" = "0" ] || [ "$ASK_PASSWORD" -eq 1 ]; then
  step "Логин и пароль для входа в админку"
  while true; do
    read -rp "Логин (латиницей, например olena): " LOGIN </dev/tty
    LOGIN="$(printf '%s' "$LOGIN" | tr -d '[:space:]' | tr '[:upper:]' '[:lower:]')"
    [[ "$LOGIN" =~ ^[a-z0-9._-]{2,32}$ ]] && break
    echo "Только латинские буквы, цифры, точка, дефис или подчёркивание."
  done
  while true; do
    read -rsp "Пароль (не меньше 6 символов, при вводе не отображается): " P1 </dev/tty; echo
    read -rsp "Повторите пароль: " P2 </dev/tty; echo
    [ "$P1" = "$P2" ] || { echo "Пароли не совпадают, ещё раз."; continue; }
    [ "${#P1}" -ge 6 ] || { echo "Слишком короткий пароль."; continue; }
    break
  done
  ADMIN_PASSWORD="$P1" run_app src/set-password.js "$LOGIN"
  unset P1 P2
else
  ok "логин уже создан (сменить пароль: sudo bash $0 --password)"
fi

# ---------------------------------------------------------------- служба
step "Запускаю службу $SERVICE…"
sed "s#/usr/bin/node#$NODE_BIN#" "$SRC_DIR/pi/rockhata-admin.service" >"/etc/systemd/system/$SERVICE.service"
chmod 644 "/etc/systemd/system/$SERVICE.service"
systemctl daemon-reload
systemctl enable "$SERVICE" >/dev/null 2>&1
systemctl restart "$SERVICE"
for _ in $(seq 1 30); do
  curl -fs "http://127.0.0.1:$PORT/api/health" >/dev/null 2>&1 && break
  sleep 1
done
curl -fs "http://127.0.0.1:$PORT/api/health" >/dev/null 2>&1 \
  || die "служба не запустилась. Посмотрите журнал: sudo journalctl -u $SERVICE -n 50"
ok "админка работает и будет запускаться сама после каждого включения платы"

# ---------------------------------------------------------------- Tailscale Funnel
if ! command -v tailscale >/dev/null 2>&1; then
  step "Устанавливаю Tailscale…"
  curl -fsSL https://tailscale.com/install.sh | sh >/dev/null
fi

if ! tailscale status >/dev/null 2>&1; then
  step "Подключение к Tailscale"
  echo "Сейчас появится ссылка https://login.tailscale.com/… — откройте её на ноутбуке"
  echo "или телефоне и войдите (можно через Google). Скрипт продолжит сам после входа."
  tailscale up --hostname=rockhata
fi

step "Включаю постоянную публичную ссылку (Funnel)…"
echo "Если появится ссылка для включения Funnel/HTTPS — откройте её и нажмите Enable."
tailscale funnel --bg "$PORT"

HOSTNAME_FQDN="$(tailscale status --json | node -e "let s='';process.stdin.on('data',d=>s+=d).on('end',()=>console.log(JSON.parse(s).Self.DNSName.replace(/\.$/,'')))")"
URL="https://$HOSTNAME_FQDN/"

cat <<EOF

$(printf '\033[1;32m')================================================================
  Готово! Адрес админки:

      $URL

  Открывается с телефона и ноутбука из любого интернета.
  Первое открытие может занять до минуты (выпускается сертификат).
================================================================$(printf '\033[0m')

ВАЖНО, один раз: https://login.tailscale.com/admin/machines →
у «rockhata» нажмите «…» → «Disable key expiry». Иначе через
180 дней ссылка перестанет работать, пока плату не переподключат.

Полезное:
  обновить программу:  cd $REPO_ROOT && git pull && sudo bash admin-server/pi/install.sh
  сменить пароль:      sudo bash $REPO_ROOT/admin-server/pi/install.sh --password
  заменить токен:      sudo bash $REPO_ROOT/admin-server/pi/install.sh --token
  журнал работы:       sudo journalctl -u $SERVICE -n 50
EOF
