FROM node:lts-alpine

RUN npm install -g http-server

WORKDIR /usr/src/schemefront

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8088

CMD ["http-server", "dist", "-p 8088"]