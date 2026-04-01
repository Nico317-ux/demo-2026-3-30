import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { Login } from './pages/Login';
import { ComercialDashboard } from './pages/comercial/ComercialDashboard';
import { CustomerManagement } from './pages/comercial/CustomerManagement';
import { FinanzasDashboard } from './pages/finanzas/FinanzasDashboard';
import { ProduccionDashboard } from './pages/produccion/ProduccionDashboard';
import { AIAssistant } from './pages/ai/AIAssistant';

// Placeholder components for Analytics and Strategy
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="w-full flex flex-col gap-6">
    <h2 className="text-2xl font-bold text-on-surface font-headline text-glow">{title}</h2>
    <div className="glass-card p-12 flex items-center justify-center border-dashed border-2 border-white/10">
      <div className="text-center">
        <span className="material-symbols-outlined text-6xl text-primary/40 mb-4">construction</span>
        <p className="text-on-surface-variant font-medium">Módulo de {title} en desarrollo.</p>
        <p className="text-xs text-slate-500 mt-2 italic">Explotando datos de ventas y proyecciones 2026...</p>
      </div>
    </div>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        
        {/* Private Dashboard Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          <Route path="comercial" element={<ComercialDashboard />} />
          <Route path="comercial/analytics" element={<PlaceholderPage title="Analítica Comercial" />} />
          <Route path="comercial/strategy" element={<PlaceholderPage title="Estrategia Comercial" />} />
          <Route path="comercial/clientes" element={<CustomerManagement />} />
          
          <Route path="finanzas" element={<FinanzasDashboard />} />
          <Route path="finanzas/analytics" element={<PlaceholderPage title="Analítica de Finanzas" />} />
          <Route path="finanzas/strategy" element={<PlaceholderPage title="Estrategia de Finanzas" />} />
          
          <Route path="produccion" element={<ProduccionDashboard />} />
          <Route path="produccion/analytics" element={<PlaceholderPage title="Analítica de Producción" />} />
          <Route path="produccion/strategy" element={<PlaceholderPage title="Estrategia de Producción" />} />
          
          <Route path="ia-assistant" element={<AIAssistant />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
