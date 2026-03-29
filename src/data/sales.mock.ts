import type { SalesRecord } from '../types';
import {
  MOCK_CUSTOMERS,
  MOCK_PRODUCT_LINES,
  MOCK_PRODUCT_NAMES,
  MOCK_REGIONS,
  MOCK_SELLERS,
  SALES_MONTH_KEYS,
} from './catalog';

let seed = 42;
function seededRand() {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
}
function srand(min: number, max: number) {
  return Math.floor(seededRand() * (max - min + 1)) + min;
}
function spick<T>(arr: readonly T[]): T {
  return arr[srand(0, arr.length - 1)]!;
}

function buildSales(): SalesRecord[] {
  const data: SalesRecord[] = [];
  seed = 42;
  for (const month of SALES_MONTH_KEYS) {
    for (const seller of MOCK_SELLERS) {
      const rowCount = srand(3, 8);
      for (let i = 0; i < rowCount; i++) {
        const units = srand(10, 500);
        const basePrice = srand(15, 280);
        data.push({
          seller,
          region: spick(MOCK_REGIONS),
          line: spick(MOCK_PRODUCT_LINES),
          customer: spick(MOCK_CUSTOMERS),
          product: spick(MOCK_PRODUCT_NAMES),
          units,
          amountUSD: units * basePrice,
          target: Math.round(units * basePrice * (0.8 + seededRand() * 0.5)),
          month,
        });
      }
    }
  }
  return data;
}

export const salesMock: SalesRecord[] = buildSales();

export const salesByMonth = SALES_MONTH_KEYS.map((month) => {
  const slice = salesMock.filter((v) => v.month === month);
  return {
    month,
    totalUSD: slice.reduce((s, v) => s + v.amountUSD, 0),
    units: slice.reduce((s, v) => s + v.units, 0),
    target: slice.reduce((s, v) => s + v.target, 0),
  };
});

export const salesBySeller = MOCK_SELLERS.map((seller) => {
  const slice = salesMock.filter((d) => d.seller === seller);
  return {
    seller,
    totalUSD: slice.reduce((s, d) => s + d.amountUSD, 0),
    units: slice.reduce((s, d) => s + d.units, 0),
    target: slice.reduce((s, d) => s + d.target, 0),
  };
});

export const salesByRegion = MOCK_REGIONS.map((region) => {
  const slice = salesMock.filter((d) => d.region === region);
  return {
    region,
    totalUSD: slice.reduce((s, d) => s + d.amountUSD, 0),
    units: slice.reduce((s, d) => s + d.units, 0),
  };
});

export const salesByLine = MOCK_PRODUCT_LINES.map((line) => {
  const slice = salesMock.filter((d) => d.line === line);
  return {
    line,
    totalUSD: slice.reduce((s, d) => s + d.amountUSD, 0),
    units: slice.reduce((s, d) => s + d.units, 0),
  };
});

export const salesByCustomer = MOCK_CUSTOMERS.map((customer) => {
  const slice = salesMock.filter((d) => d.customer === customer);
  return {
    customer,
    totalUSD: slice.reduce((s, d) => s + d.amountUSD, 0),
    units: slice.reduce((s, d) => s + d.units, 0),
    orders: slice.length,
  };
});

export const regionsList = [...MOCK_REGIONS];
export const linesList = [...MOCK_PRODUCT_LINES];
export const sellersList = [...MOCK_SELLERS];

export function salesByProduct(monthFilter?: string) {
  const base = monthFilter ? salesMock.filter((v) => v.month === monthFilter) : salesMock;
  const map = new Map<string, { units: number; amountUSD: number }>();
  for (const v of base) {
    const cur = map.get(v.product) ?? { units: 0, amountUSD: 0 };
    cur.units += v.units;
    cur.amountUSD += v.amountUSD;
    map.set(v.product, cur);
  }
  return [...map.entries()].map(([product, agg]) => ({ product, ...agg }));
}
