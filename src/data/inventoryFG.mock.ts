import type { FinishedGoodsInventoryRow } from '../types';
import { MOCK_PRODUCT_NAMES, skuFinishedGoods } from './catalog';

let seed = 101;
function seededRand() {
  seed = (seed * 1103515245 + 12345) % 2147483648;
  return seed / 2147483648;
}
function srand(min: number, max: number) {
  return Math.floor(seededRand() * (max - min + 1)) + min;
}

const daysBase = (i: number) => srand(0, 120) + (i % 5) * 3;

function buildInventory(): FinishedGoodsInventoryRow[] {
  const rows: FinishedGoodsInventoryRow[] = [];
  seed = 101;
  MOCK_PRODUCT_NAMES.forEach((description, i) => {
    const sku = skuFinishedGoods(i);
    for (const warehouse of ['A', 'B'] as const) {
      const units = srand(50, 800);
      const unitCost = srand(12, 95) + seededRand() * 5;
      const totalValue = Math.round(units * unitCost);
      const daysStill = daysBase(i + (warehouse === 'B' ? 7 : 0));
      const lastMovement = new Date(2026, 2, 29 - daysStill).toISOString().slice(0, 10);
      rows.push({
        sku,
        description,
        warehouse,
        units,
        unitCost: Math.round(unitCost * 100) / 100,
        totalValue,
        lastMovement,
        daysWithoutMovement: daysStill,
      });
    }
  });
  return rows;
}

export const finishedGoodsInventoryMock: FinishedGoodsInventoryRow[] = buildInventory();

export function inventoryRowsBySku(sku: string) {
  return finishedGoodsInventoryMock.filter((r) => r.sku === sku);
}

export function totalInventoryValue() {
  return finishedGoodsInventoryMock.reduce((s, r) => s + r.totalValue, 0);
}

export function inventoryParetoByValue() {
  const bySku = new Map<string, number>();
  for (const r of finishedGoodsInventoryMock) {
    bySku.set(r.sku, (bySku.get(r.sku) ?? 0) + r.totalValue);
  }
  const sorted = [...bySku.entries()]
    .map(([sku, value]) => ({ sku, value }))
    .sort((a, b) => b.value - a.value);
  const total = sorted.reduce((s, x) => s + x.value, 0);
  let acc = 0;
  return sorted.map((row) => {
    acc += row.value;
    return {
      ...row,
      pct: total ? (row.value / total) * 100 : 0,
      accPct: total ? (acc / total) * 100 : 0,
    };
  });
}
