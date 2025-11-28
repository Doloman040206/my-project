import { PizaService } from '../app/libs/piza-service/dist';
import type { PizaData } from '../app/libs/piza-service/dist';

const mockRepo = {
  findAll: jest.fn(),
  findById: jest.fn(),
  insert: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

const mockLogger = {
  info: jest.fn(),
  error: jest.fn(),
};

describe('PizaService (unit)', () => {
  let service: PizaService;
  beforeEach(() => {
    jest.clearAllMocks();
    service = new PizaService(mockRepo as any, mockLogger as any);
  });

  it('getAllPizas returns rows from repo', async () => {
    const rows: PizaData[] = [{ id: 1, name: 'M', ingridients: 'cheese', price: 10 }];
    mockRepo.findAll.mockResolvedValue(rows);
    const res = await service.getAllPizas();
    expect(res).toEqual(rows);
    expect(mockLogger.info).toHaveBeenCalled();
  });

  it('createPiza validates payload and inserts', async () => {
    mockRepo.insert.mockResolvedValue(5);
    mockRepo.findById.mockResolvedValue({ id: 5, name: 'X', ingridients: 'a', price: 1 });
    const created = await service.createPiza({ name: 'X', ingridients: 'a', price: 1 } as any);
    expect(created?.id).toBe(5);
    expect(mockRepo.insert).toHaveBeenCalled();
  });

  it('createPiza throws on invalid payload', async () => {
    // @ts-ignore
    await expect(service.createPiza(null)).rejects.toThrow();
  });
});
