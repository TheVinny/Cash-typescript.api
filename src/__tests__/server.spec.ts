import app from '@shared/infra/http/server';
import supertest from 'supertest';

const request = supertest(app);

test('Should be able run in port 3333', async () => {
  const res = await request.get('/');
  expect(res.status).toBe(200);
});
