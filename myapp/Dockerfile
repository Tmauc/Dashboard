FROM node:lts
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . /myapp
CMD npm run dev