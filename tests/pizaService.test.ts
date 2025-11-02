import { PizaService, PizaDataPublic } from '../app/services/pizaService';
import type { PizaData, PizaRepo } from '../app/repositories/pizaRepository';

describe('PizaService', () => {
  let mockRepo: jest.Mocked<PizaRepo>;
  let service: PizaService;

  const samplePiza: PizaData = { id: 1, name: 'Margherita', ingridients: 'tomato,cheese', price: 9 };

  beforeEach(() => {
    mockRepo = {
      findAll: jest.fn(),
      findById: jest.fn(),
      insert: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    service = new PizaService(mockRepo);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getAllPizas', () => {
    it('повертає всі піци з репозиторію', async () => {
      mockRepo.findAll.mockResolvedValue([samplePiza]);
      const res = await service.getAllPizas();
      expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
      expect(res).toEqual([samplePiza]);
    });
  });

  describe('getPizaById', () => {
    it('повертає null при порожньому id', async () => {
      const res = await service.getPizaById('');
      expect(res).toBeNull();
      expect(mockRepo.findById).not.toHaveBeenCalled();
    });

    it('повертає піцу якщо знайдена', async () => {
      mockRepo.findById.mockResolvedValue(samplePiza);
      const res = await service.getPizaById('1');
      expect(mockRepo.findById).toHaveBeenCalledWith('1');
      expect(res).toEqual(samplePiza);
    });

    it('повертає null якщо репозиторій вернув null', async () => {
      mockRepo.findById.mockResolvedValue(null);
      const res = await service.getPizaById('42');
      expect(res).toBeNull();
    });
  });

  describe('createPiza', () => {
    it('кидає помилку при некоректному payload', async () => {
      // @ts-ignore невірний payload
      await expect(service.createPiza(undefined)).rejects.toThrow('Invalid payload');
      await expect(service.createPiza({ name: 123 } as any)).rejects.toThrow('Invalid payload');
    });

    it('створює піцу та повертає її', async () => {
      const payload: Omit<PizaData, 'id'> = { name: 'Pepperoni', ingridients: 'pepperoni,cheese', price: 12 };
      mockRepo.insert.mockResolvedValue(77);
      mockRepo.findById.mockResolvedValue({ id: 77, ...payload });

      const res = await service.createPiza(payload as PizaData);

      expect(mockRepo.insert).toHaveBeenCalledWith(payload);
      expect(mockRepo.findById).toHaveBeenCalledWith('77');
      expect(res).toEqual({ id: 77, ...payload });
    });
  });

  describe('createPiza edge cases to kill survived mutants', () => {
    it('кидає помилку якщо name не рядок', async () => {
      const invalidData = { name: 123, ingridients: 'cheese', price: 10 } as any;
      await expect(service.createPiza(invalidData)).rejects.toThrow('Invalid payload');
    });

    it('кидає помилку якщо ingridients не рядок', async () => {
      const invalidData = { name: 'Margarita', ingridients: 123, price: 10 } as any;
      await expect(service.createPiza(invalidData)).rejects.toThrow('Invalid payload');
    });

    it('кидає помилку якщо price не число', async () => {
      const invalidData = { name: 'Margarita', ingridients: 'cheese', price: '10' } as any;
      await expect(service.createPiza(invalidData)).rejects.toThrow('Invalid payload');
    });

    it('кидає помилку якщо data null', async () => {
      await expect(service.createPiza(null as any)).rejects.toThrow('Invalid payload');
    });
  });

  describe('updatePiza', () => {
    it('повертає null якщо id пустий', async () => {
      const res = await service.updatePiza('', { name: 'X' });
      expect(res).toBeNull();
      expect(mockRepo.findById).not.toHaveBeenCalled();
    });
    it('повертає null якщо піци не існує', async () => {
      mockRepo.findById.mockResolvedValue(null);
      const res = await service.updatePiza('5', { price: 10 });
      expect(mockRepo.findById).toHaveBeenCalledWith('5');
      expect(res).toBeNull();
    });

    it('оновлює та повертає оновлену піцу', async () => {
      mockRepo.findById.mockResolvedValueOnce(samplePiza); // existing
      mockRepo.update.mockResolvedValue(true);
      const updated = { ...samplePiza, price: 11 };
      mockRepo.findById.mockResolvedValueOnce(updated); // after update

      const res = await service.updatePiza('1', { price: 11 });
      expect(mockRepo.findById).toHaveBeenCalledTimes(2);
      expect(mockRepo.update).toHaveBeenCalledWith('1', { price: 11 });
      expect(res).toEqual(updated);
    });
  });

  describe('deletePiza', () => {
    it('повертає false при порожньому id', async () => {
      const res = await service.deletePiza('');
      expect(res).toBe(false);
      expect(mockRepo.remove).not.toHaveBeenCalled();
    });
    it('повертає результат remove з репозиторію', async () => {
      mockRepo.remove.mockResolvedValue(true);
      const res = await service.deletePiza('3');
      expect(mockRepo.remove).toHaveBeenCalledWith('3');
      expect(res).toBe(true);
    });
  });
});