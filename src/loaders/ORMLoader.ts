import { createConnection, useContainer, Connection } from 'typeorm';
import { Container } from 'typedi';

export function loadORM(): Promise<Connection> {
  useContainer(Container);
  return createConnection(); // automatically reads from ormconfig.js to create cxn
}
