import BankLayout from './BankLayout';

const upcomingBills = [
  { id: 1, biller: 'Verizon Wireless', amount: 85.00, dueDate: 'Tomorrow', icon: '📱' },
  { id: 2, biller: 'PG&E Utility', amount: 142.50, dueDate: 'In 3 days', icon: '⚡' },
  { id: 3, biller: 'Chase Auto Finance', amount: 450.00, dueDate: 'Next Week', icon: '🚗' },
];

const PaymentsPage = () => {
  return (
    <BankLayout title="Bill Payments" subtitle="Manage and schedule your utility and service payments." activePath="/payments">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
        
        {/* Left Column: Bill Pay Hub */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <section className="card">
            <h3 className="heading-2" style={{ marginBottom: '1.5rem' }}>Upcoming Bills</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {upcomingBills.map(bill => (
                <div key={bill.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '12px', backgroundColor: 'var(--color-bg-main)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ fontSize: '2rem' }}>{bill.icon}</div>
                    <div>
                      <h4 style={{ margin: '0 0 0.25rem 0', fontWeight: 600 }}>{bill.biller}</h4>
                      <span className="text-muted" style={{ fontSize: '0.875rem' }}>Due: <strong style={{ color: 'var(--color-warning)' }}>{bill.dueDate}</strong></span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>${bill.amount.toFixed(2)}</span>
                    <button className="btn-primary" style={{ padding: '0.5rem 1rem' }}>Pay Now</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="card">
            <h3 className="heading-2" style={{ marginBottom: '1.5rem' }}>Add New Payee</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="input-group">
                <label className="input-label">Biller Name / Company</label>
                <input className="input-field" placeholder="e.g. AT&T" />
              </div>
              <div className="input-group">
                <label className="input-label">Account Number</label>
                <input className="input-field" placeholder="000-000-000" />
              </div>
            </div>
            <button className="btn-secondary-sm" style={{ marginTop: '1rem' }}>Verify Payee</button>
          </section>
        </div>

        {/* Right Column: Auto-Pay Status */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <section className="card" style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>
            <h3 className="heading-2" style={{ color: 'white', marginBottom: '0.5rem' }}>Auto-Pay Enabled</h3>
            <p style={{ opacity: 0.9, marginBottom: '1.5rem', fontSize: '0.875rem' }}>You have 4 active auto-pay schedules linked to your Platinum Checking account.</p>
            <button className="btn-secondary-sm full-width" style={{ color: 'var(--color-primary)', backgroundColor: 'white', borderColor: 'white' }}>Manage Schedules</button>
          </section>
        </div>

      </div>
    </BankLayout>
  );
};

export default PaymentsPage;
