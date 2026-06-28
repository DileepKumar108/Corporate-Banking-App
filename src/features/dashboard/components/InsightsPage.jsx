import BankLayout from './BankLayout';
import './Dashboard.css';

const InsightsPage = () => {
  return (
    <BankLayout title="Wealth Insights" subtitle="Track your spending, analyze cash flow, and manage your financial goals." activePath="/insights">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
        
        {/* Left Column: Analytics */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <section className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 className="heading-2" style={{ margin: 0 }}>Monthly Cash Flow</h3>
              <select className="input-field" style={{ width: 'auto', padding: '0.25rem 2rem 0.25rem 0.5rem' }}>
                <option>October 2023</option>
                <option>September 2023</option>
              </select>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ padding: '1rem', backgroundColor: '#ECFDF5', borderRadius: '8px', border: '1px solid #A7F3D0' }}>
                <span style={{ fontSize: '0.875rem', color: '#065F46', fontWeight: 600 }}>Total Inflow</span>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#064E3B' }}>+$8,450.00</div>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#FEF2F2', borderRadius: '8px', border: '1px solid #FECACA' }}>
                <span style={{ fontSize: '0.875rem', color: '#991B1B', fontWeight: 600 }}>Total Outflow</span>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#7F1D1D' }}>-$3,210.45</div>
              </div>
            </div>

            <h4 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Spending by Category</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                  <span>Housing & Utilities</span>
                  <strong>$1,850.00 (57%)</strong>
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--color-bg-main)', borderRadius: '4px' }}>
                  <div style={{ width: '57%', height: '100%', backgroundColor: 'var(--color-primary)', borderRadius: '4px' }}></div>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                  <span>Dining & Entertainment</span>
                  <strong>$840.20 (26%)</strong>
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--color-bg-main)', borderRadius: '4px' }}>
                  <div style={{ width: '26%', height: '100%', backgroundColor: '#F59E0B', borderRadius: '4px' }}></div>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                  <span>Transportation</span>
                  <strong>$520.25 (16%)</strong>
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--color-bg-main)', borderRadius: '4px' }}>
                  <div style={{ width: '16%', height: '100%', backgroundColor: '#10B981', borderRadius: '4px' }}></div>
                </div>
              </div>

            </div>
          </section>
        </div>

        {/* Right Column: Savings Goals */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <section className="card">
            <h3 className="heading-2" style={{ marginBottom: '1.5rem' }}>Savings Goals</h3>
            
            <div style={{ border: '1px solid var(--color-border)', borderRadius: '12px', padding: '1rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.5rem' }}>🏡</span>
                <h4 style={{ margin: 0, fontWeight: 600 }}>House Downpayment</h4>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                <span>$45,000 saved</span>
                <span className="text-muted">Goal: $100,000</span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--color-bg-main)', borderRadius: '4px' }}>
                <div style={{ width: '45%', height: '100%', backgroundColor: 'var(--color-accent)', borderRadius: '4px' }}></div>
              </div>
            </div>

            <div style={{ border: '1px solid var(--color-border)', borderRadius: '12px', padding: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.5rem' }}>🚗</span>
                <h4 style={{ margin: 0, fontWeight: 600 }}>New Car Fund</h4>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                <span>$8,400 saved</span>
                <span className="text-muted">Goal: $12,000</span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--color-bg-main)', borderRadius: '4px' }}>
                <div style={{ width: '70%', height: '100%', backgroundColor: 'var(--color-success)', borderRadius: '4px' }}></div>
              </div>
            </div>
            
            <button className="btn-secondary-sm full-width" style={{ marginTop: '1rem' }}>+ Create New Goal</button>
          </section>
        </div>

      </div>
    </BankLayout>
  );
};

export default InsightsPage;
