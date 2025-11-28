import { PizaData, PizaRepo, Logger } from './types';

export class PizaService {
  private repo: PizaRepo;
  private logger: Required<Logger>;

  constructor(repo: PizaRepo, logger?: Logger) {
    if (!repo) throw new Error('PizaRepo is required');
    const defaultLogger: Required<Logger> = {
      info: () => {},
      error: () => {},
    };
    this.repo = repo;
    this.logger = { ...defaultLogger, ...(logger || {}) } as Required<Logger>;
  }

  async getAllPizas(): Promise<PizaData[]> {
    try {
      const rows = await this.repo.findAll();
      this.logger.info('getAllPizas', { count: rows.length });
      return rows;
    } catch (err) {
      this.logger.error('getAllPizas failed', err);
      throw err;
    }
  }

  async getPizaById(id: string): Promise<PizaData | null> {
    if (!id) return null;
    try {
      return await this.repo.findById(id);
    } catch (err) {
      this.logger.error('getPizaById failed', { id, err });
      throw err;
    }
  }

  async createPiza(data: PizaData): Promise<PizaData | null> {
    if (
      !data ||
      typeof data.name !== 'string' ||
      typeof data.ingridients !== 'string' ||
      typeof data.price !== 'number'
    ) {
      throw new Error('Invalid payload');
    }
    try {
      const insertId = await this.repo.insert({
        name: data.name,
        ingridients: data.ingridients,
        price: data.price,
      });
      const created = await this.repo.findById(String(insertId));
      this.logger.info('createPiza', { id: insertId });
      return created;
    } catch (err) {
      this.logger.error('createPiza failed', { payload: data, err });
      throw err;
    }
  }

  async updatePiza(id: string, patch: Partial<PizaData>): Promise<PizaData | null> {
    if (!id) return null;
    try {
      const existing = await this.repo.findById(id);
      if (!existing) return null;
      const ok = await this.repo.update(id, patch);
      if (!ok) return null;
      const updated = await this.repo.findById(id);
      this.logger.info('updatePiza', { id });
      return updated;
    } catch (err) {
      this.logger.error('updatePiza failed', { id, patch, err });
      throw err;
    }
  }

  async deletePiza(id: string): Promise<boolean> {
    if (!id) return false;
    try {
      const ok = await this.repo.remove(id);
      this.logger.info('deletePiza', { id, ok });
      return ok;
    } catch (err) {
      this.logger.error('deletePiza failed', { id, err });
      throw err;
    }
  }
}
