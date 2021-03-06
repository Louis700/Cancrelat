FROM node:12

WORKDIR /usr/src/app

COPY . .

RUN npm ci --only=production

CMD ["node", "index.js"]
