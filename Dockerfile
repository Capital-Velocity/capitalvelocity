FROM node:18-alpine

WORKDIR /app

COPY . .

WORKDIR /app/backend/server

RUN npm install

EXPOSE 3001

CMD ["node", "server.js"]
