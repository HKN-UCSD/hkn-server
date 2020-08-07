/* eslint-disable */
// so you might be asking, why is there a js file in a typescript project?
// great question! change this file and face the wrath of the mess that is
// js/ts build systems
// need to call .env here because typeorm cli uses this config
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  synchronize: false,
  logging: false,
  entities: ['dist/entities/**/*.js'],
  migrations: ['dist/migrations/**/*.js'],
  subscribers: ['dist/subscribers/**/*.js'],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migrations',
    subscribersDir: 'src/subscribers',
  },
};
