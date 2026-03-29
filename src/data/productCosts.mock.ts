import type { ProductCost } from '../types';
import { MOCK_PRODUCT_NAMES, skuFinishedGoods } from './catalog';

let seed = 505;
function seededRand() {
  seed = (seed * 1103515245 + 12345) % 2147483648;
  return seed / 2147483648;
}
function srand(min: number, max: number) {
  return Math.floor(seededRand() * (max - min + 1)) + min;
}

function buildProductCosts(): ProductCost[] {
  seed = 505;
  return MOCK_PRODUCT_NAMES.map((product, i) => {
    const base = srand(35, 180);
    const materialCost = Math.round(base * (0.45 + seededRand() * 0.15) * 100) / 100;
    const laborCost = Math.round(base * (0.2 + seededRand() * 0.08) * 100) / 100;
    const overheadCost = Math.round(base * (0.15 + seededRand() * 0.1) * 100) / 100;
    const totalCost = Math.round((materialCost + laborCost + overheadCost) * 100) / 100;
    const salePrice = Math.round(totalCost * (1.18 + seededRand() * 0.35) * 100) / 100;
    const grossMargin = Math.round((salePrice - totalCost) * 100) / 100;
    const marginPct = salePrice ? Math.round((grossMargin / salePrice) * 1000) / 10 : 0;
    return {
      sku: skuFinishedGoods(i),
      product,
      materialCost,
      laborCost,
      overheadCost,
      totalCost,
      salePrice,
      grossMargin,
      marginPct,
    };
  });
}

export const productCostsMock: ProductCost[] = buildProductCosts();

export function productCostBySku(sku: string) {
  return productCostsMock.find((c) => c.sku === sku);
}
