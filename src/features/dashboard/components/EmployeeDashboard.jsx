import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import BankLayout from './BankLayout';
import './Dashboard.css';
import Tabs from './Tabs';
import DocumentManager from './DocumentManager';

// Mocked directory for UI purposes
const accounts = [
  { id: 'C-1042', name: 'Ava Sharma', type: 'Savings', balance: '$18,450', status: 'Active' },
  { id: 'C-2098', name: 'Mohan Verma', type: 'Checking', balance: '$7,320', status: 'Review' },
  { id: 'C-3321', name: 'Pooja Singh', type: 'Credit', balance: '$2,980', status: 'Active' },
];

const EmployeeDashboard = () => {
  const [activeTab, setActiveTab] = useState('directory');
  const [applications, setApplications] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (activeTab === 'approvals') {
      fetch('http://localhost:3000/api/admin/applications', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => setApplications(Array.isArray(data) ? data : []))
      .catch(console.error);
    } else if (activeTab === 'risk') {
      fetch('http://localhost:3000/api/admin/transactions', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => setTransactions(Array.isArray(data) ? data : []))
      .catch(console.error);
    }
  }, [activeTab, token]);

  const handleStatusUpdate = async (id, status) => {
    try {
      await fetch(`http://localhost:3000/api/applications/${id}/status`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ status })
      });
      setApplications(prev => prev.map(app => app.id === id ? { ...app, status } : app));
    } catch (err) {
      console.error(err);
      alert('Failed to update status securely.');
    }
  };

  const handleFlagTransaction = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/admin/transactions/${id}/flag`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setTransactions(prev => prev.map(tx => {
        if (tx.id === id) {
          const newFlag = !tx.flagged;
          return { ...tx, flagged: newFlag, status: newFlag ? 'Frozen (Fraud Review)' : 'Completed' };
        }
        return tx;
      }));
    } catch (err) {
      alert('Failed to flag transaction.');
    }
  };

  const handleDeleteAccount = async (e, name) => {
    e.preventDefault();
    if (window.confirm(`SECURITY WARNING: Are you sure you want to permanently delete or freeze the account for ${name}?`)) {
      alert(`Account for ${name} securely frozen for compliance review.`);
    }
  };

  const tabs = [
    { id: 'directory', label: 'Customer Directory' },
    { id: 'approvals', label: 'Loan Underwriting' },
    { id: 'risk', label: 'AML & Risk Monitoring' },
    { id: 'documents', label: 'Branch Document Center' }
  ];

  return (
    <BankLayout 
      title="Operations Overview" 
      subtitle="Manage customer records, complex underwriting, and AML compliance monitoring." 
      activePath="/employee" 
      role="employee"
    >
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'directory' && (
        <div className="dashboard-grid">
          <div className="dashboard-main-col">
            <section className="card">
              <div className="card-header">
                <h3 className="heading-2" style={{ margin: 0 }}>Customer Directory Overview</h3>
                <div className="input-group" style={{ width: '250px' }}>
                  <input className="input-field" placeholder="Search by name or ID..." />
                </div>
              </div>
              
              <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--color-border)', textAlign: 'left', color: 'var(--color-text-muted)' }}>
                    <th style={{ padding: '1rem 0.5rem', fontWeight: 600 }}>Client Name</th>
                    <th style={{ padding: '1rem 0.5rem', fontWeight: 600 }}>Account ID</th>
                    <th style={{ padding: '1rem 0.5rem', fontWeight: 600 }}>Type</th>
                    <th style={{ padding: '1rem 0.5rem', fontWeight: 600 }}>Balance</th>
                    <th style={{ padding: '1rem 0.5rem', fontWeight: 600 }}>Status</th>
                    <th style={{ padding: '1rem 0.5rem', fontWeight: 600, textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {accounts.map((account) => (
                    <tr key={account.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td style={{ padding: '1rem 0.5rem', fontWeight: 500 }}>{account.name}</td>
                      <td style={{ padding: '1rem 0.5rem', fontFamily: 'monospace', color: 'var(--color-text-muted)' }}>{account.id}</td>
                      <td style={{ padding: '1rem 0.5rem' }}>{account.type}</td>
                      <td style={{ padding: '1rem 0.5rem', fontWeight: 500 }}>{account.balance}</td>
                      <td style={{ padding: '1rem 0.5rem' }}>
                        <span style={{
                          display: 'inline-block',
                          padding: '0.25rem 0.5rem',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          backgroundColor: account.status === 'Active' ? '#ECFDF5' : '#FEF3C7',
                          color: account.status === 'Active' ? 'var(--color-success)' : 'var(--color-warning)'
                        }}>
                          {account.status}
                        </span>
                      </td>
                      <td style={{ padding: '1rem 0.5rem', textAlign: 'right' }}>
                        <button className="btn-secondary-sm" style={{ marginRight: '0.5rem' }}>Customer 360 View</button>
                        <button className="btn-secondary-sm" style={{ color: 'red', borderColor: 'red' }} onClick={(e) => handleDeleteAccount(e, account.name)}>Freeze Account</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </div>

          <div className="dashboard-side-col">
            <section className="card" style={{ backgroundColor: 'var(--color-bg-main)', border: '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-warning)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                <h4 style={{ margin: 0, fontWeight: 600 }}>Compliance Action Required</h4>
              </div>
              <h2 className="heading-1" style={{ marginBottom: '0.5rem', color: 'var(--color-primary-dark)' }}>4</h2>
              <p className="text-muted" style={{ fontWeight: 500, margin: 0 }}>Pending KYC / OFAC reviews</p>
              <p className="text-muted" style={{ fontSize: '0.875rem', marginTop: '1rem', borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
                2 accounts triggered OFAC watchlist alerts. Requires immediate director sign-off.
              </p>
            </section>
          </div>
        </div>
      )}

      {activeTab === 'approvals' && (
        <section className="card">
          <div className="card-header">
            <h3 className="heading-2" style={{ margin: 0 }}>Loan Underwriting Queue</h3>
            <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Advanced FICO & DTI Analysis Engine</span>
          </div>
          {applications.length === 0 ? (
            <p className="text-muted" style={{ padding: '2rem', textAlign: 'center' }}>No applications require underwriting right now.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
              {applications.map(app => (
                <div key={app.id} style={{ border: '1px solid var(--color-border)', borderRadius: '12px', padding: '1.5rem', display: 'flex', gap: '2rem' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <h4 style={{ margin: 0, fontSize: '1.25rem' }}>{app.fullName}</h4>
                      <span style={{
                        padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600,
                        backgroundColor: app.status === 'Approved' ? '#D1FAE5' : app.status === 'Rejected' ? '#FEE2E2' : '#FEF3C7',
                        color: app.status === 'Approved' ? '#065F46' : app.status === 'Rejected' ? '#991B1B' : '#92400E'
                      }}>{app.status}</span>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                      <div><strong>SSN:</strong> {app.ssn}</div>
                      <div><strong>Employer:</strong> {app.employment}</div>
                      <div><strong>Income:</strong> ${Number(app.annualIncome).toLocaleString()}/yr</div>
                      <div><strong>Assets:</strong> ${Number(app.totalAssets).toLocaleString()}</div>
                      <div><strong>Loan Request:</strong> ${Number(app.loanAmount).toLocaleString()} ({app.loanType})</div>
                      <div><strong>Purpose:</strong> {app.purpose}</div>
                    </div>
                  </div>

                  <div style={{ flex: 1, backgroundColor: 'var(--color-bg-main)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid var(--color-primary)' }}>
                    <h5 style={{ margin: '0 0 1rem 0' }}>Automated Underwriting Engine</h5>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span>Debt-to-Income (DTI):</span>
                      <strong style={{ color: app.underwriting?.dti > 45 ? 'red' : 'green' }}>{app.underwriting?.dti}%</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <span>Simulated FICO:</span>
                      <strong style={{ color: app.underwriting?.fico < 650 ? 'red' : 'green' }}>{app.underwriting?.fico}</strong>
                    </div>
                    <div style={{ marginBottom: '1rem', padding: '0.5rem', backgroundColor: app.underwriting?.recommendation.includes('APPROVE') ? '#D1FAE5' : '#FEF2F2', borderRadius: '4px', fontSize: '0.875rem', fontWeight: 600 }}>
                      System Rec: {app.underwriting?.recommendation}
                    </div>

                    {app.status === 'Pending' && (
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="btn-primary full-width" style={{ backgroundColor: '#059669', borderColor: '#059669' }} onClick={() => handleStatusUpdate(app.id, 'Approved')}>Approve Loan</button>
                        <button className="btn-secondary-sm full-width" style={{ color: 'red', borderColor: 'red' }} onClick={() => handleStatusUpdate(app.id, 'Rejected')}>Decline</button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {activeTab === 'risk' && (
        <section className="card">
          <div className="card-header">
            <h3 className="heading-2" style={{ margin: 0 }}>Global Transfer Monitoring</h3>
            <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Real-time AML & Fraud Analysis (CTR/SAR processing)</span>
          </div>
          {transactions.length === 0 ? (
            <p className="text-muted" style={{ padding: '2rem', textAlign: 'center' }}>No recent network transactions.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-border)', textAlign: 'left', color: 'var(--color-text-muted)' }}>
                  <th style={{ padding: '1rem 0.5rem' }}>Time</th>
                  <th style={{ padding: '1rem 0.5rem' }}>Origin & Destination</th>
                  <th style={{ padding: '1rem 0.5rem' }}>Routing (SWIFT)</th>
                  <th style={{ padding: '1rem 0.5rem' }}>Amount</th>
                  <th style={{ padding: '1rem 0.5rem' }}>Fraud Score</th>
                  <th style={{ padding: '1rem 0.5rem', textAlign: 'right' }}>Compliance Action</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(tx => (
                  <tr key={tx.id} style={{ borderBottom: '1px solid var(--color-border)', backgroundColor: tx.flagged ? '#FEF2F2' : 'transparent' }}>
                    <td style={{ padding: '1rem 0.5rem', fontSize: '0.875rem', verticalAlign: 'top' }}>{new Date(tx.timestamp).toLocaleTimeString()}</td>
                    <td style={{ padding: '1rem 0.5rem', verticalAlign: 'top' }}>
                      <strong>{tx.sender}</strong> ➔ <strong>{tx.recipient}</strong><br/>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{tx.recipientAddress} | {tx.purpose}</span>
                    </td>
                    <td style={{ padding: '1rem 0.5rem', fontFamily: 'monospace', verticalAlign: 'top' }}>{tx.swiftBic}</td>
                    <td style={{ padding: '1rem 0.5rem', fontWeight: 600, verticalAlign: 'top' }}>${tx.amount?.toLocaleString()}</td>
                    <td style={{ padding: '1rem 0.5rem', verticalAlign: 'top' }}>
                      <span style={{
                        padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600,
                        backgroundColor: tx.riskScore > 50 ? '#FEE2E2' : '#D1FAE5',
                        color: tx.riskScore > 50 ? '#991B1B' : '#065F46'
                      }}>
                        {tx.riskScore}/100 
                        {tx.amount >= 10000 && " (CTR Triggered)"}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 0.5rem', textAlign: 'right', verticalAlign: 'top' }}>
                      <button 
                        className="btn-secondary-sm" 
                        style={{ color: tx.flagged ? '#4B5563' : 'red', borderColor: tx.flagged ? '#9CA3AF' : 'red', marginBottom: '0.5rem' }} 
                        onClick={() => handleFlagTransaction(tx.id)}
                      >
                        {tx.flagged ? 'Unfreeze' : 'Freeze & File SAR'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      )}

      {activeTab === 'documents' && (
        <DocumentManager isEmployee={true} />
      )}
    </BankLayout>
  );
};

export default EmployeeDashboard;
