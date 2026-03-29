import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { Home } from './pages/Home';
import { Backorder } from './pages/Backorder';
import { InventoryFG } from './pages/InventoryFG';
import { Sales } from './pages/Sales';
import { RawMaterials } from './pages/RawMaterials';
import { ProductCosts } from './pages/ProductCosts';
import { BackorderInventory } from './pages/cross/BackorderInventory';
import { CoverageRisk } from './pages/cross/CoverageRisk';
import { Profitability } from './pages/cross/Profitability';
import { DeadStock } from './pages/cross/DeadStock';
import { PurchasePlanning } from './pages/cross/PurchasePlanning';
import { ProductHealthScorePage } from './pages/cross/ProductHealthScore';
import { ExecutiveDashboard } from './pages/ExecutiveDashboard';
import { PredictiveAlerts } from './pages/PredictiveAlerts';
import { Quotes } from './pages/Quotes';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="backorder" element={<Backorder />} />
          <Route path="inventory" element={<InventoryFG />} />
          <Route path="sales" element={<Sales />} />
          <Route path="raw-materials" element={<RawMaterials />} />
          <Route path="product-costs" element={<ProductCosts />} />
          <Route path="cross/backorder-inventory" element={<BackorderInventory />} />
          <Route path="cross/coverage" element={<CoverageRisk />} />
          <Route path="cross/profitability" element={<Profitability />} />
          <Route path="cross/dead-stock" element={<DeadStock />} />
          <Route path="cross/purchase-planning" element={<PurchasePlanning />} />
          <Route path="cross/product-health" element={<ProductHealthScorePage />} />
          <Route path="executive" element={<ExecutiveDashboard />} />
          <Route path="predictive" element={<PredictiveAlerts />} />
          <Route path="quotes" element={<Quotes />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
