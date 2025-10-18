import { NextRequest, NextResponse } from 'next/server';
import { pizaService, PizaService } from '@/app/services/pizaService';
import { withHandler } from '@/app/utils/withHandler';

  const service: PizaService = pizaService; // use default, tests may inject mock

  export const GET = withHandler(async () => {
    const rows = await service.getAllPizas();
    return NextResponse.json(rows);
  });

  export const POST = withHandler(async (request: NextRequest) => {
    const data = (await request.json()) as any;
    const created = await service.createPiza(data);
    return NextResponse.json(created, { status: 201 });
  });