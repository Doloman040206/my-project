import express from 'express';
import type { Knex } from 'knex';
import { createPizaRepository } from './repositories/pizaRepository.testing';
import { PizaService } from '../app/libs/piza-service/dist';

export function createApp(knex: Knex) {
  const app = express();
  app.use(express.json());

  const repo = createPizaRepository(knex);
  const service = new PizaService(repo);

  app.get('/pizas', async (req, res) => {
    const rows = await service.getAllPizas();
    res.json(rows);
  });

  app.post('/pizas', async (req, res) => {
    try {
      const created = await service.createPiza(req.body);
      res.status(201).json(created);
    } catch (err: any) {
      res.status(400).json({ error: err.message ?? 'Bad request' });
    }
  });

  app.get('/pizas/:id', async (req, res) => {
    const item = await service.getPizaById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  });

  app.put('/pizas/:id', async (req, res) => {
    const updated = await service.updatePiza(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  });

  app.delete('/pizas/:id', async (req, res) => {
    const ok = await service.deletePiza(req.params.id);
    if (!ok) return res.status(404).json({ error: 'Not found' });
    res.json({ status: 'ok' });
  });

  return app;
}
