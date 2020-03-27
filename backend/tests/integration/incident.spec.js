const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('Incident', () => {
  beforeEach(async () => {
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.migrate.rollback();
    await connection.destroy();
  });

  it('should be able to create a new incident', async () => {
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
      .post('/incidents')
      .set('Authorization', ong.body.id)
      .send({
        title: 'Caso 1',
        description: 'Detalhes do caso',
        value: 120,
      });

    expect(response.body).toHaveProperty('id');
  });
});
