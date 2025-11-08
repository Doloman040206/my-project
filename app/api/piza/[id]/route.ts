import { NextRequest, NextResponse } from 'next/server';
import { pizaService } from '@/app/services/pizaService';
import { withHandler } from '@/app/utils/withHandler';

const service = pizaService;

export const GET = withHandler(
  async (request: NextRequest, { params }: { params: { id: string } }) => {
    const id = params.id;
    const item = await service.getPizaById(id);
    if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(item);
  },
);

export const PUT = withHandler(
  async (request: NextRequest, { params }: { params: { id: string } }) => {
    const id = params.id;
    const patch = (await request.json()) as any;
    const updated = await service.updatePiza(id, patch);
    if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(updated);
  },
);

export const DELETE = withHandler(
  async (_req: NextRequest, { params }: { params: { id: string } }) => {
    const id = params.id;
    const ok = await service.deletePiza(id);
    if (!ok) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ status: 'ok' });
  },
);
