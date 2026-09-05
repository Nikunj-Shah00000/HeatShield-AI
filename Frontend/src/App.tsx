import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/common/ThemeProvider';
import Layout from '@/components/layout/Layout';
import Overview from '@/pages/Overview';
import HeatRiskMap from '@/pages/HeatRiskMap';
import LiveRisk from '@/pages/LiveRisk';
import HistoryPage from '@/pages/History';
import Forecast from '@/pages/Forecast';
import ActionPlan from '@/pages/ActionPlan';
import Resources from '@/pages/Resources';
import Alerts from '@/pages/Alerts';
import Reports from '@/pages/Reports';
import Settings from '@/pages/Settings';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Overview />} />
            <Route path="/map" element={<HeatRiskMap />} />
            <Route path="/live-risk" element={<LiveRisk />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/forecast" element={<Forecast />} />
            <Route path="/action-plan" element={<ActionPlan />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
