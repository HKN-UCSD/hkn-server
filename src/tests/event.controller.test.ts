import request from 'supertest';
import { getExpressApp } from '../index';

describe('GET /events', () => {
  it('tests if GET request to /events can be made without crashing the server.', async () => {
    const app = await getExpressApp();
    const res = await request(app).get('/api/events');

    expect(res.status).toBe(200);
  });
});
