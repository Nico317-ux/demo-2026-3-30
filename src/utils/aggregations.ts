import { backorderMock } from '../data/backorder.mock';
import { productCostsMock } from '../data/productCosts.mock';
import { finishedGoodsInventoryMock } from '../data/inventoryFG.mock';
import { rawMaterialsMock } from '../data/rawMaterials.mock';
import { salesMock, salesByProduct } from '../data/sales.mock';
import { calculateProductScore, scoreToHealthLight } from './predictiveModel';
import type { ProductHealthScore } from '../types';

export function backorderVsInventory() {
  return backorderMock.map((bo) => {
    const stockRows = finishedGoodsInventoryMock.filter((inv) => inv.sku === bo.sku);
    const totalStock = stockRows.reduce((s, r) => s + r.units, 0);
    const inA = stockRows.find((r) => r.warehouse === 'A')?.units ?? 0;
    const inB = stockRows.find((r) => r.warehouse === 'B')?.units ?? 0;
    const covers = totalStock >= bo.pendingUnits;
    return {
      ...bo,
      stockTotal: totalStock,
      warehouseAUnits: inA,
      warehouseBUnits: inB,
      covers,
      imbalanced: inA > 0 && inB > 0 && Math.abs(inA - inB) > 100,
    };
  });
}

export function backorderInventoryKpis() {
  const rows = backorderVsInventory();
  const withStock = rows.filter((r) => r.stockTotal > 0).length;
  const covered = rows.filter((r) => r.covers).length;
  return {
    linesWithStock: withStock,
    approxCoveredPct: rows.length ? Math.round((covered / rows.length) * 100) : 0,
  };
}

export function stockCoverageByProduct() {
  const sales = salesByProduct('2026-03');
  const byProduct = new Map(sales.map((v) => [v.product, v]));

  const productKeys = new Set<string>();
  for (const v of sales) productKeys.add(v.product);
  for (const inv of finishedGoodsInventoryMock) productKeys.add(inv.description);

  return [...productKeys].map((product) => {
    const invRows = finishedGoodsInventoryMock.filter((i) => i.description === product);
    const stock = invRows.reduce((s, i) => s + i.units, 0);
    const v = byProduct.get(product);
    const salesMonthUnits = v?.units ?? 0;
    const dailySales = salesMonthUnits / 30 || 0.1;
    const days = Math.round(stock / dailySales);
    return {
      product,
      sku: invRows[0]?.sku ?? '—',
      stock,
      salesMonthUnits,
      coverageDays: days,
      band: days < 7 ? ('low' as const) : days > 90 ? ('excess' as const) : ('ok' as const),
    };
  });
}

export function profitabilityByProduct() {
  const sales = salesByProduct();
  const salesMap = new Map(sales.map((x) => [x.product, x]));
  return productCostsMock.map((c) => {
    const v = salesMap.get(c.product);
    const revenue = v?.amountUSD ?? c.salePrice * 40;
    const costEstimate = v ? v.units * c.totalCost : c.totalCost * 100;
    const grossMargin = revenue - costEstimate;
    const marginPct = revenue ? (grossMargin / revenue) * 100 : 0;
    return {
      sku: c.sku,
      product: c.product,
      revenueUSD: Math.round(revenue),
      costUSD: Math.round(costEstimate),
      grossMarginUSD: Math.round(grossMargin),
      marginPct: Math.round(marginPct * 10) / 10,
    };
  });
}

export function deadStockRawMaterials() {
  return rawMaterialsMock.map((m) => ({
    ...m,
    dead:
      m.rotationDays > 60 || m.currentStock / Math.max(1, m.monthlyConsumption) > 3,
  }));
}

export function purchasePlanningSuggestions() {
  return rawMaterialsMock.map((m) => {
    const coverageDays = Math.round(
      (m.currentStock / Math.max(1, m.monthlyConsumption)) * 30,
    );
    const priority: 'high' | 'medium' | 'low' =
      coverageDays < 15 ? 'high' : coverageDays < 45 ? 'medium' : 'low';
    const suggested = Math.max(0, m.monthlyConsumption * 2 - m.currentStock);
    return {
      code: m.code,
      description: m.description,
      coverageDays,
      priority,
      suggestedPurchaseQty: Math.round(suggested),
      costImpactUSD: Math.round(suggested * m.unitCost),
    };
  });
}

export function productHealthScores(): ProductHealthScore[] {
  const sales = salesByProduct();
  const maxV = Math.max(1, ...sales.map((x) => x.amountUSD));
  const maxBo = Math.max(1, ...backorderMock.map((b) => b.pendingUnits));

  return productCostsMock.map((c) => {
    const v = sales.find((x) => x.product === c.product);
    const salesRelative = (v?.amountUSD ?? 0) / maxV;
    const marginRatio = Math.min(1, Math.max(0, c.marginPct / 100));
    const boForSku = backorderMock.filter((b) => b.sku === c.sku);
    const boUnits = boForSku.reduce((s, b) => s + b.pendingUnits, 0);
    const backorderNorm = 1 - Math.min(1, boUnits / maxBo);
    const inv = finishedGoodsInventoryMock.filter((i) => i.sku === c.sku);
    const stock = inv.reduce((s, i) => s + i.units, 0);
    const monthSales = v?.units ?? 1;
    const cov = stock / (monthSales / 30 || 0.1);
    const stockNorm =
      cov >= 15 && cov <= 90 ? 1 : cov < 15 ? cov / 15 : Math.max(0, 1 - (cov - 90) / 200);
    const rotationNorm = Math.min(1, c.marginPct / 50);

    const totalScore = calculateProductScore({
      salesRelative,
      marginRatio,
      rotationNorm,
      backorderNorm,
      stockNorm: Math.min(1, Math.max(0, stockNorm)),
    });

    return {
      sku: c.sku,
      product: c.product,
      scoreSales: Math.round(salesRelative * 100),
      scoreMargin: Math.round(marginRatio * 100),
      scoreRotation: Math.round(rotationNorm * 100),
      scoreBackorder: Math.round(backorderNorm * 100),
      scoreStock: Math.round(Math.min(1, Math.max(0, stockNorm)) * 100),
      totalScore,
      healthLight: scoreToHealthLight(totalScore),
    };
  });
}

export function weeklyBackorderTrendSimulated() {
  const weeks = ['W1', 'W2', 'W3', 'W4'];
  return weeks.map((week, i) => ({
    week,
    units: 800 + i * 120 + (i % 2) * 200,
  }));
}

export function fillRateDemo() {
  const totalBo = backorderMock.reduce((s, b) => s + b.pendingUnits, 0);
  const totalOrder = totalBo + 12000;
  return Math.round((1 - totalBo / totalOrder) * 1000) / 10;
}

export function globalGrossMarginDemo() {
  const r = profitabilityByProduct();
  const revenue = r.reduce((s, x) => s + x.revenueUSD, 0);
  const margin = r.reduce((s, x) => s + x.grossMarginUSD, 0);
  return { revenue, margin, pct: revenue ? (margin / revenue) * 100 : 0 };
}

export function backorderAgingBuckets() {
  const buckets = [
    { label: '0-7d', min: 0, max: 7 },
    { label: '8-30d', min: 8, max: 30 },
    { label: '31-60d', min: 31, max: 60 },
    { label: '60+d', min: 61, max: 999 },
  ];
  return buckets.map((b) => ({
    ...b,
    count: backorderMock.filter((x) => x.daysPending >= b.min && x.daysPending <= b.max).length,
  }));
}

export function monthlySalesTrend() {
  const months = ['2025-10', '2025-11', '2025-12', '2026-01', '2026-02', '2026-03'];
  return months.map((month) => {
    const v = salesMock.filter((x) => x.month === month);
    return {
      month,
      totalUSD: v.reduce((s, x) => s + x.amountUSD, 0),
    };
  });
}
