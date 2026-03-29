import type { Quote } from '../types';
import { MOCK_CUSTOMERS, MOCK_PRODUCT_NAMES, MOCK_REGIONS, MOCK_SELLERS } from './catalog';

let seed = 909;
function seededRand() {
  seed = (seed * 134775813 + 1) % 4294967296;
  return seed / 4294967296;
}
function srand(min: number, max: number) {
  return Math.floor(seededRand() * (max - min + 1)) + min;
}
function spick<T>(arr: readonly T[]): T {
  return arr[srand(0, arr.length - 1)]!;
}

const STATUSES: Quote['status'][] = ['pending', 'approved', 'rejected', 'expired'];

function buildQuotes(): Quote[] {
  const rows: Quote[] = [];
  seed = 909;
  for (let i = 0; i < 28; i++) {
    const lineCount = srand(1, 4);
    const lines = Array.from({ length: lineCount }, () => {
      const product = spick(MOCK_PRODUCT_NAMES);
      const quantity = srand(5, 120);
      const unitPrice = srand(18, 260);
      return { product, quantity, unitPrice };
    });
    const totalAmount = lines.reduce((s, p) => s + p.quantity * p.unitPrice, 0);
    rows.push({
      id: `COT-2026-${String(i + 1).padStart(4, '0')}`,
      date: new Date(2026, 2, srand(1, 28)).toISOString().slice(0, 10),
      customer: spick(MOCK_CUSTOMERS),
      seller: spick(MOCK_SELLERS),
      region: spick(MOCK_REGIONS),
      lines,
      totalAmount,
      status: spick(STATUSES),
      probability: srand(35, 95),
    });
  }
  return rows;
}

export const quotesMock: Quote[] = buildQuotes();
