export const PRODUCT_CATEGORIES = ['steel-panel', 'aluminum', 'bimetallic', 'accessories'] as const;
export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];
export const PRODUCT_BRANDS = ['Rhein', 'Evro-Termo'] as const;
export type ProductBrand = (typeof PRODUCT_BRANDS)[number];
export const SELLING_UNITS = ['piece', 'section', 'kit'] as const;
export type SellingUnit = (typeof SELLING_UNITS)[number];
export const CUSTOMER_ROLES = ['RETAIL', 'CONSTRUCTION_FIRM', 'WHOLESALE', 'ADMIN'] as const;
export type CustomerRole = (typeof CUSTOMER_ROLES)[number];

export interface SellingRules {
  unitType: SellingUnit;
  packSize: number;
}

export interface ProductLogistics {
  netWeightKg: number;
  grossWeightKg: number;
  widthCm: number;
  heightCm: number;
  depthCm: number;
}

export interface Product {
  id: string;
  sku: string;
  barcode: string;
  slug: string;
  name: string;
  brand: ProductBrand;
  category: ProductCategory;
  retailPriceUah: number;
  stockQty: number;
  warrantyYears: number;
  sellingRules: SellingRules;
  logistics: ProductLogistics;
  specs: Record<string, string | number | boolean>;
  viewsCount: number;
}
