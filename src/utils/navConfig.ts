import {
  Briefcase,
  Users,
  LineChart,
  Boxes,
  Bot
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type NavItem = {
  to: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
  description?: string;
};

export const navComercial: NavItem[] = [
  { to: '/comercial', label: 'Ventas y Rendimiento', icon: LineChart, description: 'Dashboard comercial principal' },
  { to: '/comercial/clientes', label: 'Gestión de Clientes', icon: Users, description: 'Directorio y movimientos' },
];

export const navFinanzas: NavItem[] = [
  { to: '/finanzas', label: 'Análisis Financiero', icon: Briefcase, description: 'Costos, Pareto, y Rentabilidad' },
];

export const navProduccion: NavItem[] = [
  { to: '/produccion', label: 'Producción e Inventario', icon: Boxes, description: 'Stock, Backorder y Coberturas' },
];

export const navInteligencia: NavItem[] = [
  { to: '/ia-assistant', label: 'Asistente IA', icon: Bot, description: 'Consultas inteligentes' },
];

export const routeTitles: Record<string, string> = {
  '/': 'Inicio',
  '/comercial': 'Dashboard Comercial',
  '/comercial/clientes': 'Control de Clientes',
  '/finanzas': 'Análisis Financiero',
  '/produccion': 'Gestión de Producción',
  '/ia-assistant': 'Inteligencia Artificial',
};

export function getRouteTitle(pathname: string): string {
  return routeTitles[pathname] ?? 'Dashboard';
}
