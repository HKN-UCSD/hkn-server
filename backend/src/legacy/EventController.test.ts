import request from 'supertest';
import { Application } from 'express';
import { getExpressApp } from '../app';
import { Connection } from 'typeorm';

let testApp: Application = null;
let testConnection: Connection = null;

beforeAll(async () => {
  const { app, connection } = await getExpressApp();

  testApp = app;
  testConnection = connection;

});

afterAll(async () => {
  await testConnection.close();
});

describe('GET /api/events', () => {
  it('tests if GET request to /api/events can be made without crashing the server.', async () => {
    const res = await request(testApp).get('/api/events');

    expect(res.status).toEqual(200);
  });
});

describe('GET /api/events/:eventID', () => {
  it('tests if GET request to /api/events/:eventID with some hardcoded eventID can be made without crashing the server.', async () => {
    const res = await request(testApp).get('/api/events/2');

    expect(res.status).toEqual(200);
  });
});
