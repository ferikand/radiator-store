import { prisma } from '../lib/prisma.js';
import { products } from '../modules/catalog/catalog.data.js';

async function seed() {
  const operations = products.map((p) => {
    const data = {
      sku: p.sku,
      barcode: p.barcode,
      slug: p.slug,
      name: p.name,
      brand: p.brand,
      category: p.category,
      retailPriceUah: p.retailPriceUah,
      stockQty: p.stockQty,
      warrantyYears: p.warrantyYears,
      unitType: p.sellingRules.unitType,
      packSize: p.sellingRules.packSize,
      netWeightKg: p.logistics.netWeightKg,
      grossWeightKg: p.logistics.grossWeightKg,
      widthCm: p.logistics.widthCm,
      heightCm: p.logistics.heightCm,
      depthCm: p.logistics.depthCm,
      specs: p.specs,
    };
    return prisma.product.upsert({
      where: { slug: p.slug },
      update: data,
      create: data,
    });
  });
  await prisma.$transaction(operations);
}

try {
  await seed();
} catch (error) {
  console.error(error);
} finally {
  await prisma.$disconnect();
}
