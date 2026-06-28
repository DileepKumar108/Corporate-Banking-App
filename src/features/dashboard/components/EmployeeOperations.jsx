import BankLayout from './BankLayout';

const mockTickets = [
  { id: 'TKT-9021', customer: 'Ava Sharma', category: 'Account Access', issue: 'Locked out due to invalid PIN attempts', status: 'Open', priority: 'High', time: '10 mins ago' },
  { id: 'TKT-8834', customer: 'Mohan Verma', category: 'Card Services', issue: 'Disputed charge at Best Buy ($450)', status: 'Pending Investigation', priority: 'Medium', time: '2 hours ago' },
  { id: 'TKT-7712', customer: 'Pooja Singh', category: 'Address Change', issue: 'Moved to new state, uploaded utility bill', status: 'Open', priority: 'Low', time: '1 day ago' },
];

const EmployeeOperations = () => {
  return (
    <BankLayout title="Customer Servicing" subtitle="Resolve client support tickets, dispute claims, and account management requests." activePath="/employee-operations" role="employee">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
        
        {/* Left Column: Ticketing System */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <section className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 className="heading-2" style={{ margin: 0 }}>Active Support Queue</h3>
              <div className="input-group" style={{ width: '300px' }}>
                <input className="input-field" placeholder="Search ticket ID or customer..." />
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {mockTickets.map(ticket => (
                <div key={ticket.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '1.5rem', border: '1px solid var(--color-border)', borderRadius: '12px', backgroundColor: 'var(--color-bg-main)' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                      <span style={{ fontFamily: 'monospace', fontWeight: 600, color: 'var(--color-primary)' }}>{ticket.id}</span>
                      <span style={{
                        padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600,
                        backgroundColor: ticket.priority === 'High' ? '#FEE2E2' : ticket.priority === 'Medium' ? '#FEF3C7' : '#E0E7FF',
                        color: ticket.priority === 'High' ? '#991B1B' : ticket.priority === 'Medium' ? '#92400E' : '#3730A3'
                      }}>
                        {ticket.priority} Priority
                      </span>
                      <span className="text-muted" style={{ fontSize: '0.875rem' }}>{ticket.time}</span>
                    </div>
                    
                    <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>{ticket.customer} <span style={{ fontWeight: 400, color: 'var(--color-text-muted)' }}>— {ticket.category}</span></h4>
                    <p style={{ margin: 0, fontSize: '0.9rem' }}>{ticket.issue}</p>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end', gap: '1rem', minWidth: '150px' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-warning)' }}>{ticket.status}</span>
                    <button className="btn-primary" style={{ padding: '0.5rem 1rem' }}>Open Ticket</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Quick Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <section className="card">
            <h3 className="heading-2" style={{ marginBottom: '1.5rem' }}>Service Metrics</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ padding: '1rem', backgroundColor: '#F1F5F9', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary)' }}>24</div>
                <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Open Tickets</span>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#F1F5F9', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary)' }}>12m</div>
                <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Avg Wait Time</span>
              </div>
            </div>
            
            <h4 style={{ margin: '0 0 1rem 0' }}>Quick Actions</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button className="btn-secondary-sm full-width" style={{ textAlign: 'left' }}>Initiate Password Reset</button>
              <button className="btn-secondary-sm full-width" style={{ textAlign: 'left' }}>Send Secure Message</button>
              <button className="btn-secondary-sm full-width" style={{ textAlign: 'left' }}>Order Replacement Card</button>
            </div>
          </section>
        </div>

      </div>
    </BankLayout>
  );
};

export default EmployeeOperations;
