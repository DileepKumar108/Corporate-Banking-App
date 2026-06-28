import BankLayout from './BankLayout';

const accounts = [
  {
    name: 'Primary Checking',
    type: 'Everyday account',
    balance: '$24,380.00',
    status: 'Available',
  },
  {
    name: 'Savings Vault',
    type: 'High-yield savings',
    balance: '$18,240.00',
    status: 'Growing',
  },
  {
    name: 'Investment Hub',
    type: 'Wealth portfolio',
    balance: '$42,910.00',
    status: 'Watchlist',
  },
];

const AccountsPage = () => {
  return (
    <BankLayout title="Accounts" subtitle="Review all your financial accounts in one view." activePath="/accounts">
      <div className="dashboard-grid">
        <section className="panel">
          <h3>Account overview</h3>
          <div className="account-list">
            {accounts.map((account) => (
              <div key={account.name} className="account-card">
                <div>
                  <h4>{account.name}</h4>
                  <p className="muted">{account.type}</p>
                </div>
                <div className="account-meta">
                  <strong>{account.balance}</strong>
                  <span className="status-pill">{account.status}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <h3>Next best action</h3>
          <p className="muted">Your savings balance is trending above your monthly target. Consider automating an extra transfer this week.</p>
          <div className="action-grid">
            <button className="primary-btn" type="button">Auto-save</button>
            <button className="secondary-btn" type="button">View details</button>
          </div>
        </section>
      </div>
    </BankLayout>
  );
};

export default AccountsPage;
