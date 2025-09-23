
import { NextRequest, NextResponse } from 'next/server';
import {
  getPizaById,
  updatePiza,
  deletePiza,
  PizaData,
} from '@/app/services/pizaService';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const item = await getPizaById(id);
    if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const data = (await request.json()) as Partial<PizaData>;

    const updated = await updatePiza(id, data);
    if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    await deletePiza(id);
    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}