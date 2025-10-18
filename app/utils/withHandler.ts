import { NextResponse } from 'next/server';

export function withHandler(fn: (...args: any[]) => Promise<NextResponse | Response | any>) {
  return async (...args: any[]) => {
    try {
      const result = await fn(...args);
      if (result instanceof NextResponse || result instanceof Response) return result;
      return NextResponse.json(result);
    } catch (err) {
      console.error('Handler error:', err);
      const message = (err instanceof Error && err.message) ? err.message : 'Server error';
      return NextResponse.json({ error: message === 'Invalid payload' ? message : 'Server error' }, { status: message === 'Invalid payload' ? 400 : 500 });
    }
  };
}