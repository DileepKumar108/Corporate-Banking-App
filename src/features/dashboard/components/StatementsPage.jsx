import BankLayout from './BankLayout';

const statements = [
  { month: 'June 2026', status: 'Ready', amount: '$3,240.50' },
  { month: 'May 2026', status: 'Archived', amount: '$2,980.10' },
  { month: 'April 2026', status: 'Ready', amount: '$3,105.40' },
];

const StatementsPage = () => {
  return (
    <BankLayout title="Statements" subtitle="Download monthly account statements whenever you need them." activePath="/statements">
      <div className="dashboard-grid">
        <section className="panel">
          <h3>Recent statements</h3>
          <ul className="transaction-list">
            {statements.map((item) => (
              <li key={item.month}>
                <span>
                  <strong>{item.month}</strong>
                  <div className="muted">{item.status}</div>
                </span>
                <strong>{item.amount}</strong>
              </li>
            ))}
          </ul>
        </section>

        <section className="panel">
          <h3>Statement tools</h3>
          <div className="action-grid">
            <button className="secondary-btn" type="button">Download PDF</button>
            <button className="secondary-btn" type="button">Email statement</button>
            <button className="secondary-btn" type="button">View activity</button>
          </div>
        </section>
      </div>
    </BankLayout>
  );
};

export default StatementsPage;
