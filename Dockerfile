FROM node:20-alpine
RUN apk update
RUN apk add --no-cache tzdata
RUN apk add --no-cache --upgrade bash

RUN npm install -g npm
WORKDIR /app

COPY . /app
RUN npm install

CMD ["npm", "start"]