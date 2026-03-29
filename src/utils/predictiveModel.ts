import type { PredictiveAlert } from '../types';

/**
 * Simulated ML predictions for the demo. In production these would come from a backend.
 * Title/description strings may stay in Spanish as mock business copy.
 */
export const predictiveAlerts: PredictiveAlert[] = [
  {
    id: 'pred-001',
    type: 'stockout',
    severity: 'critical',
    title: 'BASE PINTURA ASFALTICA agota en ~16 días',
    description:
      'El consumo actual proyecta agotamiento antes de la próxima orden de compra programada. Se recomienda adelantar reabasto.',
    product: 'BASE PINTURA ASFALTICA',
    value: 16,
    date: '2026-03-29',
  },
  {
    id: 'pred-002',
    type: 'anomaly',
    severity: 'high',
    title: 'Angel Alviarez: patrón anómalo detectado',
    description:
      'Las ventas de este vendedor muestran una desviación de -38% respecto a su tendencia de los últimos 6 meses.',
    entity: 'Angel Alviarez',
    value: -38,
    date: '2026-03-29',
  },
  {
    id: 'pred-003',
    type: 'backorder',
    severity: 'critical',
    title: 'MANTO FÁCIL VERDE CTE: riesgo backorder 87%',
    description:
      'La combinación de alta demanda y bajo stock sugiere un 87% de probabilidad de generar backorder en los próximos 10 días.',
    product: 'MANTO FÁCIL VERDE CTE',
    value: 87,
    date: '2026-03-29',
  },
  {
    id: 'pred-004',
    type: 'demand',
    severity: 'medium',
    title: 'Impermeabilizantes: demanda creciente +12%',
    description:
      'La línea de impermeabilizantes muestra tendencia creciente sostenida. Considerar aumento de producción.',
    entity: 'Impermeabilizantes',
    value: 12,
    date: '2026-03-29',
  },
  {
    id: 'pred-005',
    type: 'customer',
    severity: 'high',
    title: 'Ferremundial: cliente Premium en riesgo',
    description:
      'Cliente con historial Premium ha reducido sus pedidos un 45% en los últimos 2 meses. Riesgo de churn.',
    entity: 'Ferremundial',
    value: -45,
    date: '2026-03-29',
  },
  {
    id: 'pred-006',
    type: 'stockout',
    severity: 'high',
    title: 'RESINA ACRILICA agotamiento en ~22 días',
    description: 'Stock actual cubre solo 22 días de producción al ritmo actual.',
    product: 'RESINA ACRILICA',
    value: 22,
    date: '2026-03-29',
  },
  {
    id: 'pred-007',
    type: 'demand',
    severity: 'low',
    title: 'Esmaltes industriales: demanda estable',
    description:
      'La línea muestra demanda estable con leve tendencia positiva (+3%). No requiere acción inmediata.',
    entity: 'Esmaltes Industriales',
    value: 3,
    date: '2026-03-29',
  },
  {
    id: 'pred-008',
    type: 'backorder',
    severity: 'medium',
    title: 'IMPERMEABILIZANTE FIBRATADO 19L: riesgo 62%',
    description:
      'Producto con demanda estacional alta. Probabilidad de backorder si no se repone stock esta semana.',
    product: 'IMPERMEABILIZANTE FIBRATADO 19L',
    value: 62,
    date: '2026-03-29',
  },
];

export function calculateProductScore(params: {
  salesRelative: number;
  marginRatio: number;
  rotationNorm: number;
  backorderNorm: number;
  stockNorm: number;
}): number {
  const w = { sales: 0.25, margin: 0.2, rotation: 0.2, backorder: 0.2, stock: 0.15 };
  const score =
    params.salesRelative * w.sales +
    params.marginRatio * w.margin +
    params.rotationNorm * w.rotation +
    params.backorderNorm * w.backorder +
    params.stockNorm * w.stock;
  return Math.round(score * 100);
}

export function scoreToHealthLight(score: number): 'green' | 'yellow' | 'red' {
  if (score >= 70) return 'green';
  if (score >= 40) return 'yellow';
  return 'red';
}

export function formatUSD(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}

export function formatPct(value: number): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
}
