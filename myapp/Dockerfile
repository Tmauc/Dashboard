FROM node:10
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . /myapp
CMD node index.js