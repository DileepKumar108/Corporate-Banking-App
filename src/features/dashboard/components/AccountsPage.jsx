import BankLayout from './BankLayout';

const mockTransactions = [
  { id: 1, date: '2023-10-24', desc: 'Amazon.com', type: 'Debit', amount: 84.50, status: 'Completed' },
  { id: 2, date: '2023-10-23', desc: 'Direct Deposit - Employer', type: 'Credit', amount: 4500.00, status: 'Completed' },
  { id: 3, date: '2023-10-21', desc: 'Uber Rides', type: 'Debit', amount: 24.90, status: 'Completed' },
  { id: 4, date: '2023-10-20', desc: 'Whole Foods Market', type: 'Debit', amount: 142.10, status: 'Completed' },
  { id: 5, date: '2023-10-18', desc: 'Monthly Interest', type: 'Credit', amount: 12.45, status: 'Completed' },
  { id: 6, date: '2023-10-15', desc: 'AT&T Wireless', type: 'Debit', amount: 85.00, status: 'Completed' },
];

const AccountsPage = () => {
  return (
    <BankLayout title="Accounts & Cards" subtitle="Detailed view of your balances, transaction history, and digital cards." activePath="/accounts">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
        
        {/* Left Column: Transaction History */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <section className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 className="heading-2" style={{ margin: 0 }}>Recent Transactions</h3>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn-secondary-sm">Export CSV</button>
                <button className="btn-secondary-sm">Filter</button>
              </div>
            </div>
            
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-border)', textAlign: 'left', color: 'var(--color-text-muted)' }}>
                  <th style={{ padding: '1rem 0.5rem' }}>Date</th>
                  <th style={{ padding: '1rem 0.5rem' }}>Description</th>
                  <th style={{ padding: '1rem 0.5rem' }}>Status</th>
                  <th style={{ padding: '1rem 0.5rem', textAlign: 'right' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {mockTransactions.map(tx => (
                  <tr key={tx.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '1rem 0.5rem', color: 'var(--color-text-muted)' }}>{tx.date}</td>
                    <td style={{ padding: '1rem 0.5rem', fontWeight: 500 }}>{tx.desc}</td>
                    <td style={{ padding: '1rem 0.5rem' }}>
                      <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: '4px', backgroundColor: '#ECFDF5', color: '#065F46', fontWeight: 600 }}>{tx.status}</span>
                    </td>
                    <td style={{ padding: '1rem 0.5rem', textAlign: 'right', fontWeight: 600, color: tx.type === 'Credit' ? 'var(--color-success)' : 'inherit' }}>
                      {tx.type === 'Credit' ? '+' : '-'}${tx.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>

        {/* Right Column: Digital Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h3 className="heading-2">Your Cards</h3>
          
          {/* Credit Card Mockup */}
          <div style={{ padding: '1.5rem', borderRadius: '16px', background: 'linear-gradient(135deg, #0f172a, #1e293b)', color: 'white', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
              <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>Dileepkumar Reserve</span>
              <svg width="40" height="25" viewBox="0 0 32 20" fill="none"><rect width="32" height="20" rx="4" fill="#E2E8F0"/><circle cx="10" cy="10" r="6" fill="#EF4444" fillOpacity="0.8"/><circle cx="16" cy="10" r="6" fill="#F59E0B" fillOpacity="0.8"/></svg>
            </div>
            <div style={{ fontFamily: 'monospace', fontSize: '1.3rem', letterSpacing: '2px', marginBottom: '1.5rem' }}>**** **** **** 9012</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#94A3B8' }}>
              <span>AARAV RAO</span>
              <span>12/28</span>
            </div>
          </div>

          {/* Debit Card Mockup */}
          <div style={{ padding: '1.5rem', borderRadius: '16px', background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))', color: 'white', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
              <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>Platinum Debit</span>
              <span style={{ fontWeight: 800, fontStyle: 'italic' }}>VISA</span>
            </div>
            <div style={{ fontFamily: 'monospace', fontSize: '1.3rem', letterSpacing: '2px', marginBottom: '1.5rem' }}>**** **** **** 4821</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', opacity: 0.8 }}>
              <span>AARAV RAO</span>
              <span>05/27</span>
            </div>
          </div>
          
          <button className="btn-secondary-sm full-width" style={{ marginTop: '1rem' }}>Manage Cards</button>
        </div>

      </div>
    </BankLayout>
  );
};

export default AccountsPage;
