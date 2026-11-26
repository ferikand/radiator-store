import { prisma } from '../../lib/prisma.js';
import type { Product, ProductCategory, ProductBrand, SellingUnit } from './catalog.types.js';
import type { Product as PrismaProduct } from '../../generated/prisma/client.js';
import { Prisma } from '../../generated/prisma/client.js';

export interface ProductFilters {
  category?: ProductCategory;
  brand?: ProductBrand;
  page?: number;
  limit?: number;
}

export interface PaginatedProducts {
  items: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ProductViews {
  slug: string;
  viewsCount: number;
}

export async function incrementProductViews(slug: string): Promise<ProductViews | undefined> {
  try {
    return await prisma.product.update({
      where: { slug },
      data: { viewsCount: { increment: 1 } },
      select: { slug: true, viewsCount: true },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return undefined;
    }
    throw error;
  }
}

export async function getProducts(filters: ProductFilters = {}): Promise<PaginatedProducts> {
  const where: Prisma.ProductWhereInput = {};
  const page = filters.page ?? 1;
  const limit = filters.limit ?? 12;
  const skip = (page - 1) * limit;

  if (filters.category !== undefined) {
    where.category = filters.category;
  }

  if (filters.brand !== undefined) {
    where.brand = filters.brand;
  }

  const [rows, total] = await prisma.$transaction([
    prisma.product.findMany({ where, orderBy: { createdAt: 'asc' }, skip, take: limit }),
    prisma.product.count({ where }),
  ]);

  return {
    items: rows.map(toProductDto),
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const row = await prisma.product.findUnique({ where: { slug } });
  return row ? toProductDto(row) : undefined;
}

export function toProductDto(row: PrismaProduct): Product {
  const dto = {
    id: row.id,
    sku: row.sku,
    barcode: row.barcode,
    slug: row.slug,
    name: row.name,
    brand: row.brand as ProductBrand,
    category: row.category as ProductCategory,
    retailPriceUah: row.retailPriceUah,
    stockQty: row.stockQty,
    warrantyYears: row.warrantyYears,
    logistics: {
      netWeightKg: row.netWeightKg,
      grossWeightKg: row.grossWeightKg,
      widthCm: row.widthCm,
      heightCm: row.heightCm,
      depthCm: row.depthCm,
    },
    sellingRules: {
      unitType: row.unitType as SellingUnit,
      packSize: row.packSize,
    },
    specs: row.specs as Record<string, string | number | boolean>,
    viewsCount: row.viewsCount,
  };
  return dto;
}
