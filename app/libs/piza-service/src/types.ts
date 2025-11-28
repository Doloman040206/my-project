export interface PizaData {
  id?: number;
  name: string;
  ingridients: string;
  price: number;
}

export type PizaRepo = {
  findAll: () => Promise<PizaData[]>;
  findById: (id: string) => Promise<PizaData | null>;
  insert: (payload: Omit<PizaData, 'id'>) => Promise<number>; // insertId
  update: (id: string, patch: Partial<PizaData>) => Promise<boolean>;
  remove: (id: string) => Promise<boolean>;
};

export type Logger = {
  info?: (msg: string, meta?: any) => void;
  error?: (msg: string, meta?: any) => void;
};
