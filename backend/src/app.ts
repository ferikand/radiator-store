import express from 'express';
import cors from 'cors';
import { readFileSync } from 'node:fs';
import { parse } from 'yaml';
import * as swaggerUi from 'swagger-ui-express';
import type { Request, Response, NextFunction } from 'express';
import { catalogRouter } from './modules/catalog/catalog.routes.js';

const CORS_ORIGIN = process.env.CORS_ORIGIN ?? 'http://localhost:4200';
const openapiDoc = parse(readFileSync(new URL('../openapi.yml', import.meta.url), 'utf8'));

export function createApp() {
  const app = express();
  app.disable('x-powered-by');
  app.use(cors({ origin: CORS_ORIGIN }));
  app.use(express.json());
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiDoc));
  app.get('/api/health', (_req: Request, res: Response) => {
    res.status(200).json({
      status: 'ok',
      service: 'radiator-store-api',
      timestamp: new Date().toISOString(),
    });
  });
  app.use('/api/products', catalogRouter);
  app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
      next(err);
      return;
    }
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  });
  return app;
}
