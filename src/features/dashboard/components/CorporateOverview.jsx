import BankLayout from './BankLayout';

const corporateClients = [
  { id: 'CORP-101', name: 'TechCorp International', sector: 'Technology', balance: '$12,450,000', creditLine: '$5M', status: 'Healthy' },
  { id: 'CORP-244', name: 'Global Shipping Ltd', sector: 'Logistics', balance: '$4,120,000', creditLine: '$10M', status: 'Review Required' },
  { id: 'CORP-892', name: 'Apex Manufacturing', sector: 'Industrials', balance: '$8,950,000', creditLine: '$2M', status: 'Healthy' },
];

const CorporateOverview = () => {
  return (
    <BankLayout title="Corporate Accounts" subtitle="Manage institutional clients, treasury services, and large-scale credit facilities." activePath="/corporate" role="employee">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
        
        {/* Left Column: Corporate Client Roster */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <section className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 className="heading-2" style={{ margin: 0 }}>Institutional Client Portfolio</h3>
              <button className="btn-primary">Onboard New Corporation</button>
            </div>
            
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-border)', textAlign: 'left', color: 'var(--color-text-muted)' }}>
                  <th style={{ padding: '1rem 0.5rem' }}>Entity Name</th>
                  <th style={{ padding: '1rem 0.5rem' }}>Sector</th>
                  <th style={{ padding: '1rem 0.5rem' }}>Operating Cash</th>
                  <th style={{ padding: '1rem 0.5rem' }}>Credit Facility</th>
                  <th style={{ padding: '1rem 0.5rem', textAlign: 'right' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {corporateClients.map(corp => (
                  <tr key={corp.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '1rem 0.5rem' }}>
                      <strong style={{ display: 'block' }}>{corp.name}</strong>
                      <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--color-text-muted)' }}>{corp.id}</span>
                    </td>
                    <td style={{ padding: '1rem 0.5rem', color: 'var(--color-text-muted)' }}>{corp.sector}</td>
                    <td style={{ padding: '1rem 0.5rem', fontWeight: 600 }}>{corp.balance}</td>
                    <td style={{ padding: '1rem 0.5rem' }}>{corp.creditLine} Limit</td>
                    <td style={{ padding: '1rem 0.5rem', textAlign: 'right' }}>
                      <span style={{
                        padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600,
                        backgroundColor: corp.status === 'Healthy' ? '#ECFDF5' : '#FEF3C7',
                        color: corp.status === 'Healthy' ? '#065F46' : '#92400E'
                      }}>
                        {corp.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="card">
            <h3 className="heading-2" style={{ marginBottom: '1.5rem' }}>Treasury & Payroll Processing</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '8px' }}>
                <div>
                  <h4 style={{ margin: '0 0 0.25rem 0' }}>TechCorp Int. — Q3 Payroll Batch</h4>
                  <span className="text-muted" style={{ fontSize: '0.875rem' }}>$2.4M • 450 Employees • Scheduled for Tomorrow</span>
                </div>
                <button className="btn-secondary-sm" style={{ color: 'var(--color-primary)', borderColor: 'var(--color-primary)' }}>Authorize Batch</button>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '8px' }}>
                <div>
                  <h4 style={{ margin: '0 0 0.25rem 0' }}>Global Shipping — Vendor Settlement</h4>
                  <span className="text-muted" style={{ fontSize: '0.875rem' }}>$850k • Cross-border SWIFT • Pending OFAC</span>
                </div>
                <button className="btn-secondary-sm" style={{ color: 'var(--color-warning)', borderColor: 'var(--color-warning)' }}>Review Flags</button>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Relationship Manager Tools */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <section className="card" style={{ backgroundColor: 'var(--color-primary-dark)', color: 'white' }}>
            <h3 className="heading-2" style={{ color: 'white', marginBottom: '1rem' }}>RM Dashboard</h3>
            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.875rem', opacity: 0.8 }}>Total Managed Assets</span>
              <div style={{ fontSize: '2rem', fontWeight: 700 }}>$25.5M</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button className="btn-primary full-width" style={{ backgroundColor: 'white', color: 'var(--color-primary-dark)' }}>Generate Q3 Reports</button>
              <button className="btn-secondary-sm full-width" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}>Schedule Client Reviews</button>
            </div>
          </section>
        </div>

      </div>
    </BankLayout>
  );
};

export default CorporateOverview;
