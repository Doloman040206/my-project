import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import { pizaService } from '@/app/services/pizaService';
import { withHandler } from '@/app/utils/withHandler';

const service = pizaService;

export const GET = withHandler(
  async (request: NextRequest, { params }: { params: { id: string } }) => {
    try {
      const id = params.id;
      const item = await service.getPizaById(id);
      if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
      return NextResponse.json(item);
    } catch (err: any) {
      fs.appendFileSync('errors.log', `[${new Date().toISOString()}] ${err}\n`);
      return NextResponse.json({ error: 'Something went wrong' }, { status: 200 });
    }
  },
);

export const PUT = withHandler(
  async (request: NextRequest, { params }: { params: { id: string } }) => {
    try {
      const id = params.id;
      const patch = (await request.json()) as any;
      const updated = await service.updatePiza(id, patch);
      if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
      return NextResponse.json(updated);
    } catch (err: any) {
      fs.appendFileSync('errors.log', `[${new Date().toISOString()}] ${err}\n`);
      return NextResponse.json({ error: 'Something went wrong' }, { status: 200 });
    }
  },
);

export const DELETE = withHandler(
  async (_req: NextRequest, { params }: { params: { id: string } }) => {
    try {
      const id = params.id;
      const ok = await service.deletePiza(id);
      if (!ok) return NextResponse.json({ error: 'Not found' }, { status: 404 });
      return NextResponse.json({ status: 'ok' });
    } catch (err: any) {
      fs.appendFileSync('errors.log', `[${new Date().toISOString()}] ${err}\n`);
      return NextResponse.json({ error: 'Something went wrong' }, { status: 200 });
    }
  },
);
