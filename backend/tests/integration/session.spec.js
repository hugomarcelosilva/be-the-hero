const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('Session', () => {
  beforeEach(async () => {
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.migrate.rollback();
    await connection.destroy();
  });

  it('should be able to login', async () => {
    const ong = await request(app)
      .post('/ongs')
      .send({
        name: 'APAD',
        email: 'apad@email.com',
        whatsapp: '6296000000',
        city: 'Goiânia',
        uf: 'GO',
      });

    const response = await request(app)
      .post('/sessions')
      .send({
        id: ong.body.id,
      });

    expect(response.body).toHaveProperty('name');
  });

  it('should not be able to login with a uncreated ong', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({ id: 'aaaaaa' });

    expect(response.status).toBe(400);
  });
});
