import pool from '../libs/piza';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

  export interface PizaData {
    id?: number;
    name: string;
    ingridients: string;
    price: number;
  }

  export type PizaRepo = {
    findAll: () => Promise<PizaData[]>;
    findById: (id: string) => Promise<PizaData | null>;
    insert: (payload: Omit<PizaData, 'id'>) => Promise<number>; // returns insertId
    update: (id: string, patch: Partial<PizaData>) => Promise<boolean>;
    remove: (id: string) => Promise<boolean>;
  };

  export const pizaRepository: PizaRepo = {
    async findAll() {
      const [rows] = await pool.execute<PizaData[] & RowDataPacket[]>('SELECT * FROM piza');
      return rows;
    },

    async findById(id: string) {
      const [rows] = await pool.execute<PizaData[] & RowDataPacket[]>('SELECT * FROM piza WHERE id = ?', [id]);
      return rows[0] ?? null;
    },

    async insert(payload) {
      const [result] = await pool.execute<ResultSetHeader>(
        'INSERT INTO piza (name, ingridients, price) VALUES (?, ?, ?)',
        [payload.name, payload.ingridients, payload.price]
      );
      return result.insertId;
    },

    async update(id, patch) {
      const fields: string[] = [];
      const values: any[] = [];
      if (patch.name !== undefined) { fields.push('name = ?'); values.push(patch.name); }
      if (patch.ingridients !== undefined) { fields.push('ingridients = ?'); values.push(patch.ingridients); }
      if (patch.price !== undefined) { fields.push('price = ?'); values.push(patch.price); }

      if (fields.length === 0) return false;

      values.push(id);
      const sql = `UPDATE piza SET ${fields.join(', ')} WHERE id = ?`;
      const [res] = await pool.execute<ResultSetHeader>(sql, values);
      return (res.affectedRows ?? 0) > 0;
    },

    async remove(id) {
      const [res] = await pool.execute<ResultSetHeader>('DELETE FROM piza WHERE id = ?', [id]);
      return (res.affectedRows ?? 0) > 0;
    },
  };