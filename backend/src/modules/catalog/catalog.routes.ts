import { Router } from 'express';
import { getProducts, getProductBySlug, incrementProductViews } from './catalog.service.js';
import type { ProductFilters } from './catalog.service.js';
import type { ProductBrand, ProductCategory } from './catalog.types.js';
import { PRODUCT_CATEGORIES, PRODUCT_BRANDS } from './catalog.types.js';

const MAX_LIMIT = 50;

export function isProductCategory(value: unknown): value is ProductCategory {
  return typeof value === 'string' && (PRODUCT_CATEGORIES as readonly string[]).includes(value);
}

export function isProductBrand(value: unknown): value is ProductBrand {
  return typeof value === 'string' && (PRODUCT_BRANDS as readonly string[]).includes(value);
}

export function parsePositiveInt(value: unknown): number | null {
  if (typeof value !== 'string' || value.trim() === '') return null;
  const n = Number(value);
  return Number.isInteger(n) && n > 0 ? n : null;
}

export const catalogRouter = Router();
catalogRouter.get('/', async (req, res) => {
  const filters: ProductFilters = {};
  if (req.query.category !== undefined) {
    if (!isProductCategory(req.query.category)) {
      res.status(400).json({ error: 'Invalid category' });
      return;
    }
    filters.category = req.query.category;
  }

  if (req.query.brand !== undefined) {
    if (!isProductBrand(req.query.brand)) {
      res.status(400).json({ error: 'Invalid brand' });
      return;
    }
    filters.brand = req.query.brand;
  }

  if (req.query.page !== undefined) {
    const page = parsePositiveInt(req.query.page);
    if (page === null) {
      res.status(400).json({ error: 'Invalid page' });
      return;
    }
    filters.page = page;
  }

  if (req.query.limit !== undefined) {
    const limit = parsePositiveInt(req.query.limit);
    if (limit === null || limit > MAX_LIMIT) {
      res.status(400).json({ error: 'Invalid limit' });
      return;
    }
    filters.limit = limit;
  }

  const result = await getProducts(filters);
  res.status(200).json(result);
});

catalogRouter.get('/:slug', async (req, res) => {
  const product = await getProductBySlug(req.params.slug);
  if (!product) {
    res.status(404).json({ error: 'Product not found' });
    return;
  }
  res.status(200).json(product);
});

catalogRouter.post('/:slug/view', async (req, res) => {
  const slug = req.params.slug;
  const result = await incrementProductViews(slug);

  if (!result) {
    res.status(404).json({ error: 'Product not found' });
    return;
  }

  res.status(200).json(result);
});
