import { products } from './catalog.data.js';
import type { Product, ProductBrand, ProductCategory } from './catalog.types.js';

export interface ProductFilters {
  category?: ProductCategory;
  brand?: ProductBrand;
}

export function getProducts(filters: ProductFilters = {}): Product[] {
  return products.filter(
    (p) =>
      (!filters.category || p.category === filters.category) &&
      (!filters.brand || p.brand === filters.brand),
  );
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
