import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardStart } from '../store/dashboardSlice';
import { logout } from '../../auth/store/authSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.dashboard);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchDashboardStart());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="app-shell">
        <div className="dashboard-shell">
          <p className="muted">Loading your banking overview...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-shell">
        <div className="dashboard-shell">
          <div className="error-banner">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <div className="dashboard-shell">
        <header className="dashboard-header">
          <div>
            <p className="muted">Dileepkumar Bank</p>
            <h1>Customer banking portal</h1>
            <p>Welcome back, {user?.name || 'Aarav Rao'} — manage balances, cards, transfers and secure account activity in one place.</p>
          </div>
          <div className="header-actions">
            <button className="secondary-btn" type="button">Quick transfer</button>
            <button className="primary-btn" type="button" onClick={() => dispatch(logout())}>Logout</button>
          </div>
        </header>

        <div className="dashboard-grid">
          <div>
            <section className="panel">
              <p className="muted">Primary account</p>
              <h2>Platinum Checking •••• 4821</h2>
              <div className="metric-grid">
                <div className="metric-card">
                  <div className="label">Available balance</div>
                  <div className="value">${(data?.totalAssets || 128450).toLocaleString()}</div>
                </div>
                <div className="metric-card">
                  <div className="label">Active accounts</div>
                  <div className="value">{data?.activeAccounts || 4}</div>
                </div>
                <div className="metric-card">
                  <div className="label">Rewards points</div>
                  <div className="value">12,840</div>
                </div>
              </div>
            </section>

            <section className="panel" style={{ marginTop: '18px' }}>
              <h3>Recent transactions</h3>
              <ul className="transaction-list">
                {(data?.recentTransactions || [
                  { date: 'Today', description: 'Salary deposit', amount: '8250.00' },
                  { date: 'Yesterday', description: 'Utility bill', amount: '132.50' },
                  { date: 'Jun 24', description: 'Investment transfer', amount: '2000.00' },
                ]).map((tx, index) => (
                  <li key={`${tx.description}-${index}`}>
                    <span>
                      <strong>{tx.description}</strong>
                      <div className="muted">{tx.date}</div>
                    </span>
                    <strong>${tx.amount}</strong>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="panel">
            <h3>Financial goals</h3>
            <ul className="goal-list">
              <li>
                <span>Emergency fund</span>
                <strong>82%</strong>
              </li>
              <li>
                <span>Vacation planning</span>
                <strong>64%</strong>
              </li>
              <li>
                <span>Home upgrade</span>
                <strong>39%</strong>
              </li>
            </ul>
            <div className="panel" style={{ marginTop: '18px', background: 'rgba(255,255,255,0.06)' }}>
              <p className="muted">Security status</p>
              <h3>Protected by biometric login</h3>
              <p className="muted">You are using secure banking safeguards with instant transaction alerts.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;