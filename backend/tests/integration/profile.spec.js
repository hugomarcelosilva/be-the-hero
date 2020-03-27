const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('Profile', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to list profiles', async () => {
    const ong = await request(app)
      .post('/ongs')
      .send({
        name: 'APAD',
        email: 'apad@email.com',
        whatsapp: '6296000000',
        city: 'Goiânia',
        uf: 'GO',
      });

    const { status } = await request(app)
      .get('/profile')
      .set('Authorization', ong.body.id);

    expect(status).toBe(200);
  });
});
