# LTS version of node
FROM node:lts-alpine

# app location
WORKDIR /usr/src/schemeapi

# dependencies, both package.json and package-lock.json
COPY package*.json ./

# install dependencies
RUN npm install
# production, uncomment below
# RUN npm ci --only=production

# bundle app source
COPY . .

# expose ports of app
EXPOSE 8086

#start app with node 
CMD ["npm", "start"]