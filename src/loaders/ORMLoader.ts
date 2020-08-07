import { createConnection, useContainer, Connection, ConnectionManager } from 'typeorm';
import { container, instanceCachingFactory } from 'tsyringe';

export function loadORM(): Promise<Connection> {
  // https://github.com/typeorm/typeorm/issues/4790
  // create singleton cxn mgr
  container.register<ConnectionManager>(ConnectionManager, {
    useFactory: instanceCachingFactory(() => new ConnectionManager()),
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const containerShim = { get: (someClass: any) => container.resolve(someClass) as any };
  useContainer(containerShim);
  return createConnection(); // automatically reads from ormconfig.js to create cxn
}
