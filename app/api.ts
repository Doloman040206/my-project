import { PizaObject } from './types';

const base = '/api/piza';

export async function fetchPizaList(): Promise<PizaObject[]> {
  const r = await fetch(base);
  if (!r.ok) throw new Error('Failed to fetch pizas');
  return r.json();
}

export async function apiCreatePiza(payload: Omit<PizaObject, 'id'>): Promise<PizaObject> {
  const r = await fetch(base, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!r.ok) throw new Error('Create failed');
  return r.json();
}

export async function apiEditPiza(
  id: number,
  payload: Partial<Omit<PizaObject, 'id'>>,
): Promise<PizaObject> {
  const r = await fetch(`/api/piza/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!r.ok) throw new Error('Update failed');
  return r.json();
}

export async function apiDeletePiza(id: number): Promise<void> {
  const r = await fetch(`/api/piza/${id}`, { method: 'DELETE' });
  if (!r.ok) throw new Error('Delete failed');
}
