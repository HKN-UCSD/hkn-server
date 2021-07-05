FROM node:14.0.0-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

ENV NODE_ENV=development

RUN npm config set registry https://registry.npmjs.org
RUN npm install

COPY ./tsconfig.json /app/tsconfig.json
COPY ./.eslintrc /app/.eslintrc
COPY ./.prettierrc /app/.prettierrc
COPY ./ormconfig.js /app/ormconfig.js
COPY ./src /app/src

EXPOSE 3000
