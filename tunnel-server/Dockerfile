FROM node:20.12.2-buster
WORKDIR /app/tunnel-server

COPY package*.json .
RUN npm i

COPY . .

CMD [ "npm", "run", "dev" ]