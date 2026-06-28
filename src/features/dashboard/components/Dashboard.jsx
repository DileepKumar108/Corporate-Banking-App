import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardStart, makeTransfer } from '../store/dashboardSlice';
import BankLayout from './BankLayout';
import './Dashboard.css';
import OffersCarousel from './OffersCarousel';
import LoanApplicationForm from './LoanApplicationForm';
import Tabs from './Tabs';
import DocumentManager from './DocumentManager';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.dashboard);
  const { user } = useSelector((state) => state.auth);

  const [activeTab, setActiveTab] = useState('overview');
  
  // SWIFT Wire Transfer State
  const [transferForm, setTransferForm] = useState({ 
    recipient: '', 
    recipientAddress: '',
    swiftBic: '',
    purpose: 'Trade / Invoice',
    amount: '' 
  });
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    dispatch(fetchDashboardStart());
  }, [dispatch]);

  const handleWireTransfer = async (e) => {
    e.preventDefault();
    if (!transferForm.recipient.trim() || !transferForm.amount) return;

    const amt = parseFloat(transferForm.amount);
    if (isNaN(amt) || amt <= 0) return;

    try {
      const res = await fetch('http://localhost:3000/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.token || localStorage.getItem('token')}`
        },
        body: JSON.stringify({ ...transferForm, amount: amt })
      });

      if (!res.ok) throw new Error('Transfer failed');

      dispatch(makeTransfer({ amount: amt, recipient: transferForm.recipient }));
      setSuccessMsg(`Global Wire Transfer of $${amt.toFixed(2)} to ${transferForm.recipient} initiated securely.`);
      setTransferForm({ recipient: '', recipientAddress: '', swiftBic: '', purpose: 'Trade / Invoice', amount: '' });
      setActiveTab('overview');

      setTimeout(() => setSuccessMsg(''), 5000);
    } catch (err) {
      alert('Failed to securely process the global transfer. Please try again later.');
    }
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

  const tabs = [
    { id: 'overview', label: 'Portfolio Overview' },
    { id: 'transfers', label: 'Global Wire Transfer' },
    { id: 'cards', label: 'Card Management' },
    { id: 'services', label: 'Account Services' },
    { id: 'documents', label: 'Applications & Documents' }
  ];

  return (
    <BankLayout 
      title="Client Portal" 
      subtitle={`Welcome back, ${user?.name || 'Client'} — manage your balances, cards, and secure account activity.`} 
      activePath="/dashboard"
    >
      {successMsg && (
        <div className="success-toast">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          <span>{successMsg}</span>
        </div>
      )}

      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'overview' && (
        <div className="dashboard-grid">
          <div className="dashboard-main-col">
            <div style={{ marginBottom: '1.5rem' }}>
              <OffersCarousel />
            </div>
            
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
              </div>
            </section>
          </div>
        </div>
      )}

      {activeTab === 'transfers' && (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <section className="card">
            <h3 className="heading-2" style={{ marginBottom: '0.5rem' }}>Global SWIFT Wire Transfer</h3>
            <p className="text-muted" style={{ marginBottom: '2rem' }}>Secure international and domestic wire transfers. AML/CFT compliance required.</p>
            
            <form onSubmit={handleWireTransfer} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div className="input-group">
                <label className="input-label">Beneficiary Full Name or Corporate Entity</label>
                <input className="input-field" required value={transferForm.recipient} onChange={e => setTransferForm({...transferForm, recipient: e.target.value})} />
              </div>
              <div className="input-group">
                <label className="input-label">Beneficiary Physical Address</label>
                <input className="input-field" required value={transferForm.recipientAddress} onChange={e => setTransferForm({...transferForm, recipientAddress: e.target.value})} placeholder="Required by OFAC" />
              </div>

              <div className="input-group">
                <label className="input-label">SWIFT / BIC Code</label>
                <input className="input-field" required value={transferForm.swiftBic} onChange={e => setTransferForm({...transferForm, swiftBic: e.target.value})} placeholder="e.g. BOFAUS3N" />
              </div>
              <div className="input-group">
                <label className="input-label">Purpose of Remittance</label>
                <select className="input-field" value={transferForm.purpose} onChange={e => setTransferForm({...transferForm, purpose: e.target.value})}>
                  <option>Trade / Invoice Settlement</option>
                  <option>Family Support / Personal</option>
                  <option>Investment Funding</option>
                  <option>Real Estate Transaction</option>
                </select>
              </div>

              <div className="input-group" style={{ gridColumn: '1 / -1' }}>
                <label className="input-label">Amount (USD)</label>
                <input className="input-field amount-input" type="number" required min="1" step="any" value={transferForm.amount} onChange={e => setTransferForm({...transferForm, amount: e.target.value})} placeholder="0.00" />
              </div>

              <button className="btn-primary full-width" type="submit" style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>
                Authorize SWIFT Transfer
              </button>
            </form>
          </section>
        </div>
      )}

      {activeTab === 'cards' && (
        <section className="card">
          <h3 className="heading-2" style={{ marginBottom: '1.5rem' }}>Digital Card Management</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div style={{ padding: '1.5rem', border: '1px solid var(--color-border)', borderRadius: '12px', background: 'linear-gradient(135deg, #0f172a, #1e293b)', color: 'white' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <span style={{ fontWeight: 600 }}>Dileepkumar Reserve</span>
                <svg width="32" height="20" viewBox="0 0 32 20" fill="none"><rect width="32" height="20" rx="4" fill="#E2E8F0"/><circle cx="10" cy="10" r="6" fill="#EF4444" fillOpacity="0.8"/><circle cx="16" cy="10" r="6" fill="#F59E0B" fillOpacity="0.8"/></svg>
              </div>
              <div style={{ fontFamily: 'monospace', fontSize: '1.25rem', letterSpacing: '2px', marginBottom: '1rem' }}>**** **** **** 9012</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#94A3B8' }}>
                <span>AARAV RAO</span>
                <span>12/28</span>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <button className="btn-secondary-sm" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                <span>Freeze Card Temporarily</span> <span>🔒</span>
              </button>
              <button className="btn-secondary-sm" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                <span>Report Lost or Stolen</span> <span>⚠️</span>
              </button>
              <button className="btn-secondary-sm" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                <span>Adjust ATM Limits</span> <span>⚙️</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'services' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <section className="card">
            <h3 className="heading-2">Order Cheque Book</h3>
            <p className="text-muted" style={{ marginBottom: '1.5rem' }}>Delivered securely to your registered address in 3-5 business days.</p>
            <div className="input-group">
              <label className="input-label">Number of Leaves</label>
              <select className="input-field" style={{ marginBottom: '1rem' }}>
                <option>25 Leaves (Standard)</option>
                <option>50 Leaves</option>
                <option>100 Leaves (Corporate)</option>
              </select>
            </div>
            <button className="btn-primary full-width" onClick={() => alert('Order Placed Successfully.')}>Request Delivery</button>
          </section>

          <section className="card">
            <h3 className="heading-2">Stop Cheque Payment</h3>
            <p className="text-muted" style={{ marginBottom: '1.5rem' }}>Instantly flag a cheque to prevent it from being cleared.</p>
            <div className="input-group">
              <label className="input-label">Cheque Number</label>
              <input className="input-field" placeholder="e.g. 0004921" style={{ marginBottom: '1rem' }} />
            </div>
            <button className="btn-secondary-sm full-width" style={{ color: 'var(--color-danger)', borderColor: 'var(--color-danger)' }} onClick={() => alert('Stop payment instruction submitted.')}>Submit Stop Request</button>
          </section>
        </div>
      )}

      {activeTab === 'documents' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <DocumentManager isEmployee={false} />
          <LoanApplicationForm />
        </div>
      )}

    </BankLayout>
  );
};

export default Dashboard;