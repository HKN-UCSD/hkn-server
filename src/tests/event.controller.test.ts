import request from 'supertest';
import { getExpressApp } from '../app';
import { Connection } from 'typeorm';

class currentApp {
  private app: any;
  private connection: Connection;

  set(app: any, connection: Connection): void {
    this.app = app;
    this.connection = connection;
  }

  get() {
    return { app: this.app, connection: this.connection };
  }
}

const currApp = new currentApp();

beforeAll(async () => {
  const { app, connection } = await getExpressApp();
  currApp.set(app, connection);
});

afterAll(async () => {
  const { connection } = currApp.get();
  await connection.close();
});

describe('GET /api/events', () => {
  it('tests if GET request to /api/events can be made without crashing the server.', async () => {
    const { app } = currApp.get();
    const res = await request(app).get('/api/events');

    expect(res.status).toEqual(200);
  });
});

describe('GET /api/events/:eventID', () => {
  it('tests if GET request to /api/events/:eventID with some hardcoded eventID can be made without crashing the server.', async () => {
    const { app } = currApp.get();
    const res = await request(app).get('/api/events/2');

    expect(res.status).toEqual(200);
  });
});
