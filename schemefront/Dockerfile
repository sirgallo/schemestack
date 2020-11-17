FROM node:lts-alpine as build-stage

WORKDIR /schemefront

COPY package*.json ./

RUN npm ci --silent

COPY . .

RUN npm run build

FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /schemefront/dist /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8088

CMD ["nginx", "-g", "daemon off;"]

#FROM node:lts-alpine

#RUN npm install -g http-server

#WORKDIR /usr/src/schemefront

#COPY package*.json ./

#RUN npm install

#COPY . .

#RUN npm run build

#EXPOSE 8088

#CMD ["http-server", "dist", "-p 8088"]