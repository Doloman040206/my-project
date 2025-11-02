import type { Knex } from 'knex';

export interface PizaData {
  id?: number;
  name: string;
  ingridients: string;
  price: number;
}

export type PizaRepo = {
  findAll: () => Promise<PizaData[]>;
  findById: (id: string) => Promise<PizaData | null>;
  insert: (payload: Omit<PizaData, 'id'>) => Promise<number>;
  update: (id: string, patch: Partial<PizaData>) => Promise<boolean>;
  remove: (id: string) => Promise<boolean>;
};

export function createPizaRepository(knex: Knex): PizaRepo {
  const table = 'piza';

  return {
    async findAll() {
      return knex<PizaData>(table).select('*');
    },

    async findById(id: string) {
      const row = await knex<PizaData>(table).where({ id: Number(id) }).first();
      return row ?? null;
    },

    async insert(payload) {
      const [insertId] = await knex<PizaData>(table).insert(payload);
      return Number(insertId);
    },

    async update(id, patch) {
      const affected = await knex<PizaData>(table).where({ id: Number(id) }).update(patch);
      return (affected ?? 0) > 0;
    },

    async remove(id) {
      const affected = await knex<PizaData>(table).where({ id: Number(id) }).del();
      return (affected ?? 0) > 0;
    },
  };
}