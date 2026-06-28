import BankLayout from './BankLayout';

const accounts = [
  { id: 'C-1042', name: 'Ava Sharma', type: 'Savings', balance: '$18,450' },
  { id: 'C-2098', name: 'Mohan Verma', type: 'Checking', balance: '$7,320' },
  { id: 'C-3321', name: 'Pooja Singh', type: 'Credit', balance: '$2,980' },
];

const EmployeeDashboard = () => {
  return (
    <BankLayout title="Employee Console" subtitle="Manage customer records, approvals, servicing requests and branch operations from a secure banking workspace." activePath="/employee" role="employee">
      <div className="dashboard-grid">
        <section className="panel">
          <h3>Customer account overview</h3>
          <div className="account-list">
            {accounts.map((account) => (
              <div key={account.id} className="account-card">
                <div>
                  <h4>{account.name}</h4>
                  <p className="muted">{account.type} • {account.id}</p>
                </div>
                <div className="account-meta">
                  <strong>{account.balance}</strong>
                  <span className="status-pill">Active</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <h3>Branch operations</h3>
          <div className="action-grid">
            <button className="primary-btn" type="button">Create account</button>
            <button className="secondary-btn" type="button">Update customer</button>
            <button className="secondary-btn" type="button">Review approvals</button>
          </div>
          <div className="panel" style={{ marginTop: '16px', background: 'rgba(255,255,255,0.06)' }}>
            <p className="muted">Today’s queue</p>
            <h4>12 pending KYC reviews</h4>
            <p className="muted">3 high-priority account updates and 2 fee reversal cases require review.</p>
          </div>
        </section>
      </div>
    </BankLayout>
  );
};

export default EmployeeDashboard;
