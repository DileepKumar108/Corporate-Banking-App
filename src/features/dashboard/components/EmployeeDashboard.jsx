import BankLayout from './BankLayout';
import './Dashboard.css';

const accounts = [
  { id: 'C-1042', name: 'Ava Sharma', type: 'Savings', balance: '$18,450', status: 'Active' },
  { id: 'C-2098', name: 'Mohan Verma', type: 'Checking', balance: '$7,320', status: 'Review' },
  { id: 'C-3321', name: 'Pooja Singh', type: 'Credit', balance: '$2,980', status: 'Active' },
];

const EmployeeDashboard = () => {
  return (
    <BankLayout title="Operations Overview" subtitle="Manage customer records, approvals, servicing requests and branch operations from a secure banking workspace." activePath="/employee" role="employee">
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
                      <button className="btn-secondary-sm">View Profile</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>

        <div className="dashboard-side-col">
          <section className="card">
            <h3 className="heading-2" style={{ marginBottom: '1.5rem' }}>Branch Operations</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <button className="btn-primary full-width">Onboard New Client</button>
              <button className="btn-secondary-sm" style={{ padding: '0.875rem' }}>Update Client Record</button>
              <button className="btn-secondary-sm" style={{ padding: '0.875rem' }}>Review Pending Approvals</button>
            </div>
          </section>

          <section className="card" style={{ backgroundColor: 'var(--color-bg-main)', border: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-warning)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
              <h4 style={{ margin: 0, fontWeight: 600 }}>Action Required</h4>
            </div>
            <h2 className="heading-1" style={{ marginBottom: '0.5rem', color: 'var(--color-primary-dark)' }}>12</h2>
            <p className="text-muted" style={{ fontWeight: 500, margin: 0 }}>Pending KYC reviews</p>
            <p className="text-muted" style={{ fontSize: '0.875rem', marginTop: '1rem', borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
              3 high-priority account updates and 2 fee reversal cases require immediate supervisor review.
            </p>
          </section>
        </div>
      </div>
    </BankLayout>
  );
};

export default EmployeeDashboard;
