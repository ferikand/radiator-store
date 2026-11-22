import { Router } from 'express';
import { getProducts, getProductBySlug } from './catalog.service.js';
import type { ProductFilters } from './catalog.service.js';
import type { ProductBrand, ProductCategory } from './catalog.types.js';
import { PRODUCT_CATEGORIES, PRODUCT_BRANDS } from './catalog.types.js';

export function isProductCategory(value: unknown): value is ProductCategory {
  return typeof value === 'string' && (PRODUCT_CATEGORIES as readonly string[]).includes(value);
}

export function isProductBrand(value: unknown): value is ProductBrand {
  return typeof value === 'string' && (PRODUCT_BRANDS as readonly string[]).includes(value);
}

export const catalogRouter = Router();
catalogRouter.get('/', (req, res) => {
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
  const items = getProducts(filters);
  res.status(200).json({ items, total: items.length });
});
catalogRouter.get('/:slug', (req, res) => {
  const product = getProductBySlug(req.params.slug);
  if (!product) {
    res.status(404).json({ error: 'Product not found' });
    return;
  }
  res.status(200).json(product);
});
