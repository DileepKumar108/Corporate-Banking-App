import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardStart, makeTransfer } from '../store/dashboardSlice';
import BankLayout from './BankLayout';
import './Dashboard.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.dashboard);
  const { user } = useSelector((state) => state.auth);

  const [transferForm, setTransferForm] = useState({ recipient: '', amount: '' });
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    dispatch(fetchDashboardStart());
  }, [dispatch]);

  const handleQuickTransfer = (e) => {
    e.preventDefault();
    if (!transferForm.recipient.trim() || !transferForm.amount) return;

    const amt = parseFloat(transferForm.amount);
    if (isNaN(amt) || amt <= 0) return;

    if (data.accounts[0].balance < amt) {
      alert('Insufficient funds in Platinum Checking!');
      return;
    }

    dispatch(makeTransfer({ amount: transferForm.amount, recipient: transferForm.recipient }));
    setSuccessMsg(`Successfully sent $${amt.toFixed(2)} to ${transferForm.recipient}!`);
    setTransferForm({ recipient: '', amount: '' });

    setTimeout(() => {
      setSuccessMsg('');
    }, 4000);
  };

  if (loading) {
    return (
      <div className="layout-container" style={{ alignItems: 'center', justifyContent: 'center' }}>
        <p className="text-muted">Loading your premium banking dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="layout-container" style={{ alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div className="error-alert">{error}</div>
      </div>
    );
  }

  const checkingBalance = data?.accounts?.[0]?.balance ?? 128450;
  const savingsBalance = data?.accounts?.[1]?.balance ?? 45800;
  const investmentBalance = data?.accounts?.[2]?.balance ?? 95400;
  const totalAssets = checkingBalance + savingsBalance + investmentBalance;

  return (
    <BankLayout 
      title="Portfolio Overview" 
      subtitle={`Welcome back, ${user?.name || 'Aarav Rao'} — manage your balances, cards, and secure account activity.`} 
      activePath="/dashboard"
    >
      {successMsg && (
        <div className="success-toast">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          <span>{successMsg}</span>
        </div>
      )}

      <div className="dashboard-grid">
        <div className="dashboard-main-col">
          <section className="card asset-summary">
            <div className="card-header">
              <h3 className="heading-2" style={{ margin: 0 }}>Primary Accounts</h3>
              <button className="btn-secondary-sm">View Statements</button>
            </div>
            
            <div className="total-assets">
              <span className="text-muted">Total Net Worth</span>
              <h2 className="heading-1">${totalAssets.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
            </div>
            
            <div className="account-cards">
              <div className="account-card primary">
                <div className="account-type">Platinum Checking</div>
                <div className="account-number">•••• 4821</div>
                <div className="account-balance">${checkingBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
              </div>
              <div className="account-card">
                <div className="account-type">High-Yield Savings</div>
                <div className="account-number">•••• 1923</div>
                <div className="account-balance">${savingsBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
              </div>
            </div>
          </section>

          <section className="card">
            <div className="card-header">
              <h3 className="heading-2" style={{ margin: 0 }}>Recent Activity</h3>
              <a href="#" className="view-all-link">View All</a>
            </div>
            <ul className="transaction-list">
              {(data?.recentTransactions || []).slice(0, 5).map((tx) => {
                const isDebit = parseFloat(tx.amount) < 0;
                return (
                  <li key={tx.id} className="transaction-item">
                    <div className="tx-icon">
                      {isDebit ? '↘' : '↗'}
                    </div>
                    <div className="tx-details">
                      <strong className="tx-desc">{tx.description}</strong>
                      <span className="tx-date text-muted">{tx.date}</span>
                    </div>
                    <div className={`tx-amount ${isDebit ? 'debit' : 'credit'}`}>
                      {isDebit ? '' : '+'}${Math.abs(parseFloat(tx.amount)).toFixed(2)}
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>

        <div className="dashboard-side-col">
          <section className="card">
            <h3 className="heading-2" style={{ marginBottom: '1.5rem' }}>Quick Transfer</h3>
            <form onSubmit={handleQuickTransfer} className="transfer-form">
              <div className="input-group">
                <label htmlFor="quick-recipient" className="input-label">Recipient</label>
                <input
                  id="quick-recipient"
                  className="input-field"
                  value={transferForm.recipient}
                  onChange={(e) => setTransferForm({ ...transferForm, recipient: e.target.value })}
                  placeholder="Name or account number"
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="quick-amount" className="input-label">Amount (USD)</label>
                <input
                  id="quick-amount"
                  type="number"
                  className="input-field amount-input"
                  value={transferForm.amount}
                  onChange={(e) => setTransferForm({ ...transferForm, amount: e.target.value })}
                  placeholder="0.00"
                  min="1"
                  step="any"
                  required
                />
              </div>
              <button className="btn-primary full-width" type="submit" style={{ marginTop: '1rem' }}>
                Review Transfer
              </button>
            </form>
          </section>

          <section className="card insights-card">
            <h3 className="heading-2" style={{ marginBottom: '1.5rem' }}>Wealth Insights</h3>
            <div className="chart-wrapper">
              <div className="pie-chart-mockup">
                <div className="pie-center">
                  <span className="pie-total">$42k</span>
                  <span className="pie-label text-muted">Expenses</span>
                </div>
              </div>
            </div>
            <div className="chart-legend">
              <div className="legend-row">
                <span className="legend-dot" style={{ backgroundColor: 'var(--color-primary)' }}></span>
                <span className="legend-text">Investments</span>
                <span className="legend-value">45%</span>
              </div>
              <div className="legend-row">
                <span className="legend-dot" style={{ backgroundColor: 'var(--color-accent)' }}></span>
                <span className="legend-text">Transfers</span>
                <span className="legend-value">35%</span>
              </div>
              <div className="legend-row">
                <span className="legend-dot" style={{ backgroundColor: '#94A3B8' }}></span>
                <span className="legend-text">Other</span>
                <span className="legend-value">20%</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </BankLayout>
  );
};

export default Dashboard;