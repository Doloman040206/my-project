
import { NextRequest, NextResponse } from 'next/server';
import { getAllPizas, createPiza, PizaData } from '@/app/services/pizaService';

export async function GET() {
  try {
    const rows = await getAllPizas();
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = (await request.json()) as PizaData;

    if (
      !data ||
      typeof data.name !== 'string' ||
      typeof data.ingridients !== 'string' ||
      typeof data.price !== 'number'
    ) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const created = await createPiza(data);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}