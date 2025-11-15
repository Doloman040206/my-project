import type { NextApiRequest, NextApiResponse } from 'next';
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const metric = req.body;
    console.warn('WV metric received:', metric);
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
}
