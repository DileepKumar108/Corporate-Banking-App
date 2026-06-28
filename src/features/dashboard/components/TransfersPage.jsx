import BankLayout from './BankLayout';

const TransfersPage = () => {
  return (
    <BankLayout title="Transfers" subtitle="Move money securely between accounts and recipients." activePath="/transfers">
      <div className="dashboard-grid">
        <section className="panel">
          <h3>Send money</h3>
          <div className="form-group">
            <label htmlFor="recipient">Recipient</label>
            <input id="recipient" placeholder="Enter recipient" />
          </div>
          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input id="amount" placeholder="Enter amount" />
          </div>
          <button className="primary-btn" type="button">Confirm transfer</button>
        </section>

        <section className="panel">
          <h3>Transfer history</h3>
          <ul className="transaction-list">
            <li><span><strong>Alex Chen</strong><div className="muted">Today</div></span><strong>$550</strong></li>
            <li><span><strong>Home savings</strong><div className="muted">Yesterday</div></span><strong>$1,200</strong></li>
          </ul>
        </section>
      </div>
    </BankLayout>
  );
};

export default TransfersPage;
