FROM node:15

WORKDIR /run

COPY package*.json ./

RUN npm i --no-audit --unsafe-perm

COPY .eslintrc .eslintrc
COPY .prettierrc .prettierrc
COPY tsconfig.json tsconfig.json
COPY ormconfig.js ormconfig.js

EXPOSE 3001
