FROM node:12.14.0-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

ENV NODE_ENV=development

RUN npm config set registry https://registry.npmjs.org
RUN npm install

COPY ./public /app/public
COPY ./config-overrides.js /app/config-overrides.js
COPY ./tsconfig.json /app/tsconfig.json
COPY ./tsconfig.paths.json /app/tsconfig.paths.json

COPY ./src /app/src

EXPOSE 3000
