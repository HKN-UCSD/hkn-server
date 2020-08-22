import { createConnection, Connection } from 'typeorm';

export function loadORM(): Promise<Connection> {
  return createConnection(); // automatically reads from ormconfig.js to create cxn
}
