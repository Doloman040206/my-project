import type { PizaData, PizaRepo } from '@/app/repositories/pizaRepository';
import { pizaRepository } from '@/app/repositories/pizaRepository';

  export type PizaDataPublic = PizaData;

  export class PizaService {
    private repo: PizaRepo;

    constructor(repo: PizaRepo = pizaRepository) {
      this.repo = repo;
    }

    async getAllPizas() {
      return this.repo.findAll();
    }

    async getPizaById(id: string) {
      if (!id) return null;
      return this.repo.findById(id);
    }

    async createPiza(data: PizaData) {
      if (!data || typeof data.name !== 'string' || typeof data.ingridients !== 'string' || typeof data.price !== 'number') {
        throw new Error('Invalid payload');
      }
      const insertId = await this.repo.insert({ name: data.name, ingridients: data.ingridients, price: data.price });
      return this.repo.findById(String(insertId));
    }

    async updatePiza(id: string, patch: Partial<PizaData>) {
      if (!id) return null;
      const existing = await this.repo.findById(id);
      if (!existing) return null;
      await this.repo.update(id, patch);
      return this.repo.findById(id);
    }

    async deletePiza(id: string) {
      if (!id) return false;
      return this.repo.remove(id);
    }
  }

  export const pizaService = new PizaService();