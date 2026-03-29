import type { BackorderItem } from '../types';
import { MOCK_CUSTOMERS, MOCK_PRODUCT_NAMES, MOCK_REGIONS, MOCK_SELLERS, skuFinishedGoods } from './catalog';

let seed = 707;
function seededRand() {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
}
function srand(min: number, max: number) {
  return Math.floor(seededRand() * (max - min + 1)) + min;
}
function spick<T>(arr: readonly T[]): T {
  return arr[srand(0, arr.length - 1)]!;
}

function priorityFromDays(days: number): BackorderItem['priority'] {
  if (days > 45) return 'high';
  if (days > 20) return 'medium';
  return 'low';
}

function buildBackorder(): BackorderItem[] {
  const rows: BackorderItem[] = [];
  seed = 707;
  const n = 42;
  for (let i = 0; i < n; i++) {
    const product = spick(MOCK_PRODUCT_NAMES);
    const idx = MOCK_PRODUCT_NAMES.indexOf(product as (typeof MOCK_PRODUCT_NAMES)[number]);
    const sku = skuFinishedGoods(idx >= 0 ? idx : 0);
    const daysPending = srand(1, 90);
    rows.push({
      orderId: `BO-2026-${String(i + 1).padStart(4, '0')}`,
      date: new Date(2026, 2, 30 - daysPending).toISOString().slice(0, 10),
      customer: spick(MOCK_CUSTOMERS),
      product,
      sku,
      pendingUnits: srand(5, 400),
      daysPending,
      priority: priorityFromDays(daysPending),
      seller: spick(MOCK_SELLERS),
      region: spick(MOCK_REGIONS),
    });
  }
  return rows;
}

export const backorderMock: BackorderItem[] = buildBackorder();

export function totalBackorderUnits() {
  return backorderMock.reduce((s, b) => s + b.pendingUnits, 0);
}

export function averageAgingDays() {
  if (!backorderMock.length) return 0;
  return Math.round(backorderMock.reduce((s, b) => s + b.daysPending, 0) / backorderMock.length);
}
