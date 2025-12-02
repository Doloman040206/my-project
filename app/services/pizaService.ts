import type { PizaData } from 'piza-service';
import { PizaService as PizaServiceLib } from 'piza-service';

import { pizaRepository } from '../repositories/pizaRepository';

export type PizaDataPublic = PizaData;

export const pizaService = new PizaServiceLib(pizaRepository);
export type PizaService = InstanceType<typeof PizaServiceLib>;
