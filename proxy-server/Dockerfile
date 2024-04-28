FROM node:20.12.2-buster
WORKDIR /app/proxy-server

COPY package*.json .
RUN npm ci

COPY . .

CMD [ "npm", "run", "dev" ]