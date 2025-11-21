import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import { pizaService, PizaService } from '@/app/services/pizaService';
import { withHandler } from '@/app/utils/withHandler';

const service: PizaService = pizaService; // use default

export const GET = withHandler(async () => {
  try {
    const rows = await service.getAllPizas();
    return NextResponse.json(rows);
  } catch (err: any) {
    fs.appendFileSync('errors.log', `[${new Date().toISOString()}] ${err}\n`);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 200 });
  }
});

export const POST = withHandler(async (request: NextRequest) => {
  try {
    const data = (await request.json()) as any;
    const created = await service.createPiza(data);
    return NextResponse.json(created, { status: 201 });
  } catch (err: any) {
    fs.appendFileSync('errors.log', `[${new Date().toISOString()}] ${err}\n`);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 200 });
  }
});
