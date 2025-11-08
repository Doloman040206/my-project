import knexPkg, { Knex } from 'knex';
import { createPizaRepository, PizaData } from '../../app/repositories/pizaRepository.testing';

let knex: Knex;
let repoReturn: ReturnType<typeof createPizaRepository>;

beforeAll(async () => {
  knex = knexPkg({
    client: 'sqlite3',
    connection: {
      filename: ':memory:',
    },
    useNullAsDefault: true,
  });

  await knex.schema.createTable('piza', (t) => {
    t.increments('id').primary();
    t.string('name').notNullable();
    t.text('ingridients').notNullable();
    t.float('price').notNullable();
  });

  repoReturn = createPizaRepository(knex);
});

afterAll(async () => {
  await knex.destroy();
});

describe('pizaRepository (sqlite integration)', () => {
  test('insert -> findById -> findAll -> update -> remove', async () => {
    const payload: Omit<PizaData, 'id'> = { name: 'Test', ingridients: 'a,b', price: 5.5 };
    const id = await repoReturn.insert(payload);
    expect(typeof id).toBe('number');

    const found = await repoReturn.findById(String(id));
    expect(found).not.toBeNull();
    expect(found!.name).toBe(payload.name);
    expect(found!.price).toBeCloseTo(5.5);

    const all = await repoReturn.findAll();
    expect(all.length).toBeGreaterThanOrEqual(1);

    const ok = await repoReturn.update(String(id), { price: 6.25 });
    expect(ok).toBe(true);

    const updated = await repoReturn.findById(String(id));
    expect(updated!.price).toBeCloseTo(6.25);

    const removed = await repoReturn.remove(String(id));
    expect(removed).toBe(true);

    const shouldBeNull = await repoReturn.findById(String(id));
    expect(shouldBeNull).toBeNull();
  });
});
