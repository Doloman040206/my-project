import knexPkg, { Knex } from 'knex';
import request from 'supertest';
import { createApp } from '../../app/server';
import { createPizaRepository, PizaRepo } from '../../app/repositories/pizaRepository.testing';

let knex: Knex;
let app: ReturnType<typeof createApp>;
let repo: PizaRepo;

beforeAll(async () => {
  knex = knexPkg({
    client: 'sqlite3',
    connection: { filename: ':memory:' },
    useNullAsDefault: true,
  });

  await knex.schema.createTable('piza', (t) => {
    t.increments('id').primary();
    t.string('name').notNullable();
    t.text('ingridients').notNullable();
    t.float('price').notNullable();
  });

  repo = createPizaRepository(knex);

  app = createApp(knex);
});

afterAll(async () => {
  await knex.destroy();
});

describe('Piza E2E', () => {
  let createdId: number;

  test('POST /pizas створює піцу', async () => {
    const payload = { name: 'E2EPizza', ingridients: 'cheese,tomato', price: 10 };
    const res = await request(app).post('/pizas').send(payload);

    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(payload.name);

    createdId = res.body.id;
  });

  test('GET /pizas повертає список з новою піцою', async () => {
    const res = await request(app).get('/pizas');
    expect(res.status).toBe(200);
    expect(res.body.find((p: any) => p.id === createdId)).toBeDefined();
  });

  test('GET /pizas/:id повертає конкретну піцу', async () => {
    const res = await request(app).get(`/pizas/${createdId}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('E2EPizza');
  });

  test('PUT /pizas/:id оновлює піцу', async () => {
    const res = await request(app).put(`/pizas/${createdId}`).send({ price: 12 });
    expect(res.status).toBe(200);
    expect(res.body.price).toBeCloseTo(12);

    const updated = await repo.findById(String(createdId));
    expect(updated?.price).toBeCloseTo(12);
  });

  test('DELETE /pizas/:id видаляє піцу', async () => {
    const res = await request(app).delete(`/pizas/${createdId}`);
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');

    const deleted = await repo.findById(String(createdId));
    expect(deleted).toBeNull();
  });
});