import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { Login } from './pages/Login';
import { ComercialDashboard } from './pages/comercial/ComercialDashboard';
import { CustomerManagement } from './pages/comercial/CustomerManagement';
import { FinanzasDashboard } from './pages/finanzas/FinanzasDashboard';
import { ProduccionDashboard } from './pages/produccion/ProduccionDashboard';
import { AIAssistant } from './pages/ai/AIAssistant';

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
          <Route path="comercial/clientes" element={<CustomerManagement />} />
          
          <Route path="finanzas" element={<FinanzasDashboard />} />
          
          <Route path="produccion" element={<ProduccionDashboard />} />
          
          <Route path="ia-assistant" element={<AIAssistant />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
