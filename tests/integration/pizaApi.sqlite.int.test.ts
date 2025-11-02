import knexPkg, { Knex } from 'knex';
import request from 'supertest';
import { createApp } from '../../app/server';

let knex: Knex;
let app: ReturnType<typeof createApp>;

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

  app = createApp(knex);
});

afterAll(async () => {
  await knex.destroy();
});

describe('Piza API (integration using sqlite in-memory)', () => {
  test('POST /pizas створює та GET /pizas/:id повертає', async () => {
    const payload = { name: 'TestPizza', ingridients: 'tomato,cheese', price: 8.5 };

    const postRes = await request(app).post('/pizas').send(payload);
    expect(postRes.status).toBe(201);
    expect(postRes.body.id).toBeDefined();
    expect(postRes.body.name).toBe(payload.name);

    const id = postRes.body.id;
    const getRes = await request(app).get(`/pizas/${id}`);
    expect(getRes.status).toBe(200);
    expect(getRes.body.name).toBe(payload.name);
    expect(getRes.body.price).toBeCloseTo(8.5);
  });

  test('GET /pizas повертає масив', async () => {
    const res = await request(app).get('/pizas');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('PUT /pizas/:id оновлює запис', async () => {
    // створимо спочатку новий
    const p = { name: 'UpdPizza', ingridients: 'x', price: 4.5 };
    const postRes = await request(app).post('/pizas').send(p);
    const id = postRes.body.id;

    const putRes = await request(app).put(`/pizas/${id}`).send({ price: 5.25 });
    expect(putRes.status).toBe(200);
    expect(putRes.body.price).toBeCloseTo(5.25);

    const getRes = await request(app).get(`/pizas/${id}`);
    expect(getRes.body.price).toBeCloseTo(5.25);
  });

  test('DELETE /pizas/:id видаляє запис', async () => {
    const p = { name: 'DelPizza', ingridients: 'x', price: 3 };
    const postRes = await request(app).post('/pizas').send(p);
    const id = postRes.body.id;

    const delRes = await request(app).delete(`/pizas/${id}`);
    expect(delRes.status).toBe(200);
    expect(delRes.body.status).toBe('ok');

    const getRes = await request(app).get(`/pizas/${id}`);
    expect(getRes.status).toBe(404);
  });
});