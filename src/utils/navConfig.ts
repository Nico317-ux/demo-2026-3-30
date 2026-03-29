import {
  Activity,
  BarChart3,
  Boxes,
  ClipboardList,
  FileSpreadsheet,
  Gauge,
  GitCompare,
  Home,
  Layers,
  LineChart,
  Package,
  ShoppingCart,
  Sparkles,
  Truck,
  Wallet,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type NavItem = {
  to: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
};

export const navHome: NavItem = { to: '/', label: 'Home', icon: Home };

export const navCoreModules: NavItem[] = [
  { to: '/backorder', label: '01 · Backorder', icon: ClipboardList },
  { to: '/inventory', label: '02 · Inventory & stock', icon: Boxes },
  { to: '/sales', label: '03 · Sales KPIs', icon: LineChart },
  { to: '/raw-materials', label: '04 · Raw material rotation', icon: Truck },
  { to: '/product-costs', label: '05 · Product costs', icon: Wallet },
];

export const navCrossModules: NavItem[] = [
  { to: '/cross/backorder-inventory', label: '06 · Backorder vs inventory', icon: GitCompare },
  { to: '/cross/coverage', label: '07 · Sales vs inventory', icon: Package },
  { to: '/cross/profitability', label: '08 · Sales vs costs', icon: BarChart3 },
  { to: '/cross/dead-stock', label: '09 · RM rotation vs stock', icon: Layers },
  { to: '/cross/purchase-planning', label: '10 · Purchase planning', icon: ShoppingCart },
  { to: '/cross/product-health', label: '11 · Health score', icon: Activity },
  { to: '/executive', label: '12 · Executive dashboard', icon: Gauge },
];

export const navExtra: NavItem[] = [
  { to: '/predictive', label: 'Predictive intelligence', icon: Sparkles },
  { to: '/quotes', label: 'Quotes', icon: FileSpreadsheet },
];

export const routeTitles: Record<string, string> = {
  '/': 'Home · Dashboard map',
  '/backorder': '01 · Backorder — Open orders',
  '/inventory': '02 · Finished goods (A / B)',
  '/sales': '03 · Sales indicators',
  '/raw-materials': '04 · Raw material rotation',
  '/product-costs': '05 · Product costs',
  '/cross/backorder-inventory': '06 · Backorder vs inventory',
  '/cross/coverage': '07 · Coverage & stockout risk',
  '/cross/profitability': '08 · Profitability by product',
  '/cross/dead-stock': '09 · Dead / slow raw stock',
  '/cross/purchase-planning': '10 · Purchase planning',
  '/cross/product-health': '11 · Product health score',
  '/executive': '12 · Executive dashboard',
  '/predictive': 'Predictive intelligence center',
  '/quotes': 'Quotes',
};

export function getRouteTitle(pathname: string): string {
  return routeTitles[pathname] ?? 'Dashboard';
}
