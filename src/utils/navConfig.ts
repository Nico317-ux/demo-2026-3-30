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
  description?: string;
};

export const navHome: NavItem = { to: '/', label: 'Inicio', icon: Home };

export const navCoreModules: NavItem[] = [
  { to: '/backorder',     label: 'Backorder',              icon: ClipboardList, description: 'Pedidos pendientes por cliente' },
  { to: '/inventory',     label: 'Inventario',             icon: Boxes,         description: 'Stock de producto terminado' },
  { to: '/sales',         label: 'KPIs de Ventas',         icon: LineChart,      description: 'Indicadores clave de ventas' },
  { to: '/raw-materials', label: 'Materia Prima',          icon: Truck,          description: 'Rotación y stock de MP' },
  { to: '/product-costs', label: 'Costos de Producto',     icon: Wallet,         description: 'Estructura de costos por SKU' },
];

export const navCrossModules: NavItem[] = [
  { to: '/cross/backorder-inventory', label: 'Backorder vs Inventario', icon: GitCompare,   description: 'Cruce de demanda y stock' },
  { to: '/cross/coverage',            label: 'Cobertura de Ventas',     icon: Package,       description: 'Días de cobertura por SKU' },
  { to: '/cross/profitability',       label: 'Ventas vs Costos',        icon: BarChart3,     description: 'Rentabilidad por producto' },
  { to: '/cross/dead-stock',          label: 'Material Lento',          icon: Layers,        description: 'Rotación MP vs stock actual' },
  { to: '/cross/purchase-planning',   label: 'Plan de Compras',         icon: ShoppingCart,  description: 'Sugeridos de reabastecimiento' },
  { to: '/cross/product-health',      label: 'Salud Operativa',         icon: Activity,      description: 'Score integral por producto' },
  { to: '/executive',                 label: 'Dashboard Ejecutivo',     icon: Gauge,          description: 'Vista consolidada gerencial' },
];

export const navExtra: NavItem[] = [
  { to: '/predictive', label: 'Inteligencia Predictiva', icon: Sparkles,       description: 'Alertas y anomalías detectadas' },
  { to: '/quotes',     label: 'Cotizaciones',             icon: FileSpreadsheet, description: 'Gestión de cotizaciones B2B' },
];

export const routeTitles: Record<string, string> = {
  '/':                          'Inicio',
  '/backorder':                 'Backorder',
  '/inventory':                 'Inventario',
  '/sales':                     'KPIs de Ventas',
  '/raw-materials':             'Materia Prima',
  '/product-costs':             'Costos de Producto',
  '/cross/backorder-inventory': 'Backorder vs Inventario',
  '/cross/coverage':            'Cobertura de Ventas',
  '/cross/profitability':       'Ventas vs Costos',
  '/cross/dead-stock':          'Material Lento',
  '/cross/purchase-planning':   'Plan de Compras',
  '/cross/product-health':      'Salud Operativa',
  '/executive':                 'Dashboard Ejecutivo',
  '/predictive':                'Inteligencia Predictiva',
  '/quotes':                    'Cotizaciones',
};

export function getRouteTitle(pathname: string): string {
  return routeTitles[pathname] ?? 'Dashboard';
}
