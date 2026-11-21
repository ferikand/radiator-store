import express from 'express';
import cors from 'cors';
import type { Request, Response } from 'express';

const CORS_ORIGIN = process.env.CORS_ORIGIN ?? 'http://localhost:4200';

const app = express();
app.disable('x-powered-by');
app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());
const PORT = Number(process.env.PORT ?? 3000);
app.get('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    service: 'radiator-store-api',
    timestamp: new Date().toISOString(),
  });
});
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
