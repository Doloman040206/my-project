import { PizaData, PizaRepo, Logger } from './types';
export declare class PizaService {
    private repo;
    private logger;
    constructor(repo: PizaRepo, logger?: Logger);
    getAllPizas(): Promise<PizaData[]>;
    getPizaById(id: string): Promise<PizaData | null>;
    createPiza(data: PizaData): Promise<PizaData | null>;
    updatePiza(id: string, patch: Partial<PizaData>): Promise<PizaData | null>;
    deletePiza(id: string): Promise<boolean>;
}
