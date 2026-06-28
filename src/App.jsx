import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import IntroVideo from './components/IntroVideo';
import Login from './features/auth/components/Login';
import Dashboard from './features/dashboard/components/Dashboard';
import CardsPage from './features/dashboard/components/CardsPage';
import PaymentsPage from './features/dashboard/components/PaymentsPage';
import TransfersPage from './features/dashboard/components/TransfersPage';
import SecurityPage from './features/dashboard/components/SecurityPage';
import InsightsPage from './features/dashboard/components/InsightsPage';
import StatementsPage from './features/dashboard/components/StatementsPage';
import AccountsPage from './features/dashboard/components/AccountsPage';
import RewardsPage from './features/dashboard/components/RewardsPage';
import CorporateOverview from './features/dashboard/components/CorporateOverview';
import OperationsCenter from './features/dashboard/components/OperationsCenter';
import EmployeeDashboard from './features/dashboard/components/EmployeeDashboard';
import EmployeeOperations from './features/dashboard/components/EmployeeOperations';
import './App.css';

const App = () => {
  const { token } = useSelector((state) => state.auth);

  return (
    <Router>
      <IntroVideo />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" replace />} />
        <Route path="/accounts" element={token ? <AccountsPage /> : <Navigate to="/login" replace />} />
        <Route path="/cards" element={token ? <CardsPage /> : <Navigate to="/login" replace />} />
        <Route path="/payments" element={token ? <PaymentsPage /> : <Navigate to="/login" replace />} />
        <Route path="/transfers" element={token ? <TransfersPage /> : <Navigate to="/login" replace />} />
        <Route path="/insights" element={token ? <InsightsPage /> : <Navigate to="/login" replace />} />
        <Route path="/statements" element={token ? <StatementsPage /> : <Navigate to="/login" replace />} />
        <Route path="/security" element={token ? <SecurityPage /> : <Navigate to="/login" replace />} />
        <Route path="/rewards" element={token ? <RewardsPage /> : <Navigate to="/login" replace />} />
        <Route path="/corporate" element={token ? <CorporateOverview /> : <Navigate to="/login" replace />} />
        <Route path="/operations" element={token ? <OperationsCenter /> : <Navigate to="/login" replace />} />
        <Route path="/employee" element={token ? <EmployeeDashboard /> : <Navigate to="/login" replace />} />
        <Route path="/employee-operations" element={token ? <EmployeeOperations /> : <Navigate to="/login" replace />} />
        <Route path="/" element={<Navigate to={token ? '/dashboard' : '/login'} replace />} />
      </Routes>
    </Router>
  );
};

export default App;