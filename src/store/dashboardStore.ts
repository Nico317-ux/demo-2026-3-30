import { create } from 'zustand';
import type { GlobalFilters } from '../types';

interface DashboardState {
  filters: GlobalFilters;
  sidebarOpen: boolean;
  setFilter: <K extends keyof GlobalFilters>(key: K, value: GlobalFilters[K]) => void;
  resetFilters: () => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

const defaultFilters: GlobalFilters = {
  period: '2026-03',
  region: 'All',
  line: 'All',
  warehouse: 'All',
};

export const useDashboardStore = create<DashboardState>((set) => ({
  filters: defaultFilters,
  sidebarOpen: false,
  setFilter: (key, value) =>
    set((state) => ({ filters: { ...state.filters, [key]: value } })),
  resetFilters: () => set({ filters: defaultFilters }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}));
