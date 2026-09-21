FROM node:20-alpine

# git is needed to clone/commit/push menu-data.js back to the site's repo.
RUN apk add --no-cache git

WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev

COPY src ./src
COPY migrations ./migrations
COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x entrypoint.sh

CMD ["./entrypoint.sh"]
