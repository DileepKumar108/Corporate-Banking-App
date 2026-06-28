import BankLayout from './BankLayout';

const payments = [
  { name: 'Rent', amount: '$2,200', status: 'Scheduled' },
  { name: 'Internet', amount: '$89', status: 'Completed' },
  { name: 'Insurance', amount: '$340', status: 'Pending' },
];

const PaymentsPage = () => {
  return (
    <BankLayout title="Payments" subtitle="Pay bills, subscriptions, and merchants instantly." activePath="/payments">
      <div className="dashboard-grid">
        <section className="panel">
          <h3>Quick pay</h3>
          <div className="action-grid">
            <button className="secondary-btn" type="button">Pay bills</button>
            <button className="secondary-btn" type="button">Manage subscriptions</button>
            <button className="secondary-btn" type="button">Add beneficiary</button>
          </div>
        </section>

        <section className="panel">
          <h3>Scheduled payments</h3>
          <ul className="transaction-list">
            {payments.map((item) => (
              <li key={item.name}>
                <span>
                  <strong>{item.name}</strong>
                  <div className="muted">{item.status}</div>
                </span>
                <strong>{item.amount}</strong>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </BankLayout>
  );
};

export default PaymentsPage;
