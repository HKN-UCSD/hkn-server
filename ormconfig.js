/* eslint-disable */
// so you might be asking, why is there a js file in a typescript project?
// great question! change this file and face the wrath of the mess that is
// js/ts build systems
// need to call .env here because typeorm cli uses this config

let entities = 'dist/entities/**/*.js';

if (process.env.NODE_ENV === 'test') {
  entities = 'src/entities/**/*.ts';
}

let prodSSLConfig = { ssl: true, extra: { ssl: { rejectUnauthorized: false } } };
let localSSLConfig = { ssl: false, extra: {} };
let sslConfig = process.env.NODE_ENV === 'development' ? localSSLConfig : prodSSLConfig;

module.exports = [
  {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    ssl: prodSSLConfig.ssl,
    extra: prodSSLConfig.extra,
    synchronize: false,
    logging: false,
    entities: [entities],
    migrations: ['dist/migrations/**/*.js'],
    subscribers: ['dist/subscribers/**/*.js'],
    cli: {
      entitiesDir: 'src/entities',
      migrationsDir: 'src/migrations',
      subscribersDir: 'src/subscribers',
    },
  },
  {
    name: 'seed',
    type: 'postgres',
    url: process.env.DATABASE_URL,
    ssl: sslConfig.ssl,
    extra: sslConfig.extra,
    synchronize: false,
    logging: false,
    entities: [entities],
    migrations: ['dist/seeds/**/*.js'],
    cli: {
      entitiesDir: 'src/entities',
      migrationsDir: 'src/seeds',
    },
  },
];
