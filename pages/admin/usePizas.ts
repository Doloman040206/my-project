// hooks/usePizas.ts
import { useState, useEffect, useCallback } from 'react';
import { PizaObject } from './types';
import * as api from './api';

export function usePizas() {
  const [pizas, setPizas] = useState<PizaObject[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const list = await api.fetchPizaList();
      setPizas(list);
    } catch (e: any) {
      setError(e.message);
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const add = useCallback(async (name: string, ingridients: string, price: number) => {
    const created = await api.apiCreatePiza({ name, ingridients, price });
    setPizas(prev => [created, ...prev]);
  }, []);

  const edit = useCallback(async (id: number, data: Partial<PizaObject>) => {
    const updated = await api.apiEditPiza(id, data);
    setPizas(prev => prev.map(p => p.id === id ? updated : p));
  }, []);

  const remove = useCallback(async (id: number) => {
    await api.apiDeletePiza(id);
    setPizas(prev => prev.filter(p => p.id !== id));
  }, []);

  return { pizas, loading, error, reload: load, add, edit, remove };
}