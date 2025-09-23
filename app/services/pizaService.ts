
import pool from '@/app/libs/piza';

export interface PizaData {
  name: string;
  ingridients: string;
  price: number;
}

export async function getAllPizas() {
  const db = await pool.getConnection();
  try {
    const query = 'SELECT * FROM piza';
    const [rows] = await db.execute(query);
    return rows;
  } finally {
    db.release();
  }
}

export async function getPizaById(id: string) {
  const db = await pool.getConnection();
  try {
    const query = 'SELECT * FROM piza WHERE id = ?';
    // @ts-ignore
    const [rows] = await db.execute(query, [id]);
    // @ts-ignore
    return rows[0] ?? null;
  } finally {
    db.release();
  }
}

export async function createPiza(data: PizaData) {
  const db = await pool.getConnection();
  try {
    const insertQuery =
      'INSERT INTO piza (name, ingridients, price) VALUES (?, ?, ?)';
    // @ts-ignore
    const [result] = await db.execute(insertQuery, [
      data.name,
      data.ingridients,
      data.price,
    ]);

    // @ts-ignore
    const insertId = result.insertId;
    // @ts-ignore
    const [rows] = await db.execute('SELECT * FROM piza WHERE id = ?', [
      insertId,
    ]);
    // @ts-ignore
    return rows[0];
  } finally {
    db.release();
  }
}

export async function updatePiza(id: string, data: Partial<PizaData>) {
  const db = await pool.getConnection();
  try {
    const [existingRows] = await db.execute('SELECT * FROM piza WHERE id = ?', [
      id,
    ]);
    // @ts-ignore
    const existing = existingRows[0];
    if (!existing) return null;

    const newName = data.name ?? existing.name;
    const newIngridients = data.ingridients ?? existing.ingridients;
    const newPrice = data.price ?? existing.price;

    const updateQuery =
      'UPDATE piza SET name = ?, ingridients = ?, price = ? WHERE id = ?';
    await db.execute(updateQuery, [newName, newIngridients, newPrice, id]);

    // @ts-ignore
    const [rows] = await db.execute('SELECT * FROM piza WHERE id = ?', [id]);
    // @ts-ignore
    return rows[0] ?? null;
  } finally {
    db.release();
  }
}

export async function deletePiza(id: string) {
  const db = await pool.getConnection();
  try {
    const query = 'DELETE FROM piza WHERE id = ?';
    const [result] = await db.execute(query, [id]);
    return result;
  } finally {
    db.release();
  }
}