/** Sales transaction line (mock B2B) */
export interface SalesRecord {
  seller: string;
  region: string;
  line: string;
  customer: string;
  product: string;
  units: number;
  amountUSD: number;
  target: number;
  month: string;
}

/** Finished goods inventory row */
export interface FinishedGoodsInventoryRow {
  sku: string;
  description: string;
  warehouse: 'A' | 'B';
  units: number;
  unitCost: number;
  totalValue: number;
  lastMovement: string;
  daysWithoutMovement: number;
}

/** Raw material master + stock */
export interface RawMaterial {
  code: string;
  description: string;
  unit: string;
  currentStock: number;
  monthlyConsumption: number;
  rotationDays: number;
  lastPurchase: string;
  unitCost: number;
  inventoryValue: number;
  supplier: string;
}

export interface BackorderItem {
  orderId: string;
  date: string;
  customer: string;
  product: string;
  sku: string;
  pendingUnits: number;
  daysPending: number;
  priority: 'high' | 'medium' | 'low';
  seller: string;
  region: string;
}

export interface QuoteLine {
  product: string;
  quantity: number;
  unitPrice: number;
}

export interface Quote {
  id: string;
  date: string;
  customer: string;
  seller: string;
  region: string;
  lines: QuoteLine[];
  totalAmount: number;
  status: 'pending' | 'approved' | 'rejected' | 'expired';
  probability: number;
}

export interface ProductCost {
  sku: string;
  product: string;
  materialCost: number;
  laborCost: number;
  overheadCost: number;
  totalCost: number;
  salePrice: number;
  grossMargin: number;
  marginPct: number;
}

export interface KpiData {
  label: string;
  value: string | number;
  delta?: number;
  deltaLabel?: string;
  icon?: string;
  color?: 'green' | 'red' | 'yellow' | 'blue' | 'neutral';
}

export type HealthLightColor = 'green' | 'yellow' | 'red';

export interface ProductHealthScore {
  sku: string;
  product: string;
  scoreSales: number;
  scoreMargin: number;
  scoreRotation: number;
  scoreBackorder: number;
  scoreStock: number;
  totalScore: number;
  healthLight: HealthLightColor;
}

export type PredictiveAlertType = 'stockout' | 'anomaly' | 'backorder' | 'demand' | 'customer';

export type AlertSeverity = 'critical' | 'high' | 'medium' | 'low';

export interface PredictiveAlert {
  id: string;
  type: PredictiveAlertType;
  severity: AlertSeverity;
  /** Mock copy may remain in Spanish */
  title: string;
  description: string;
  product?: string;
  entity?: string;
  value?: number;
  date: string;
}

export interface GlobalFilters {
  period: string;
  region: string;
  line: string;
  warehouse: string;
}
