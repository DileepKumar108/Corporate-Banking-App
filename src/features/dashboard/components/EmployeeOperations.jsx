import { useState } from 'react';
import BankLayout from './BankLayout';

const initialCustomers = [
  { id: 1, name: 'Ava Sharma', account: 'SB-1024', status: 'Active', balance: '$18,450' },
  { id: 2, name: 'Mohan Verma', account: 'CK-2048', status: 'Pending Review', balance: '$7,320' },
  { id: 3, name: 'Pooja Singh', account: 'CR-3301', status: 'Active', balance: '$2,980' },
];

const workstreams = [
  {
    title: 'Portfolio Overview',
    purpose: 'High-level metrics for branch health',
    fields: ['Total Assets', 'Active Accounts', 'Net Revenue', 'Loan-to-Deposit Ratio'],
  },
  {
    title: 'Transaction Monitoring',
    purpose: 'Live feed of significant movements',
    fields: ['Recent Transactions', 'Real-time cash flow graphs', 'Flagged transfers'],
  },
  {
    title: 'Overrides & Approvals',
    purpose: 'Manager-level authorization',
    fields: ['Requesting Employee ID', 'Transaction Amount', 'Override Reason Dropdown', 'Approve / Reject buttons'],
  },
  {
    title: 'Employee Performance',
    purpose: 'Tracking staff efficiency',
    fields: ['Teller ID', 'Transactions Processed', 'Average Handling Time', 'Error Rate'],
  },
];

const lendingWorkstreams = [
  {
    title: 'Origination',
    purpose: 'Starting a new loan application',
    fields: ['Loan Type', 'Requested Amount', 'Term Length', 'Interest Rate Type'],
  },
  {
    title: 'Credit Analysis',
    purpose: 'Evaluating borrower risk',
    fields: ['Credit Score', 'Debt-to-Income Ratio', 'Employment Verification', 'Annual Income'],
  },
  {
    title: 'Collateral Management',
    purpose: 'Tracking assets backing the loan',
    fields: ['Asset Type', 'Appraised Value', 'Appraisal Date', 'Insurance Expiry Date'],
  },
  {
    title: 'Disbursement',
    purpose: 'Releasing funds after approval',
    fields: ['Disbursing Account', 'Receiving Account', 'Disbursement Date', 'Amortization Schedule'],
  },
];

const complianceWorkstreams = [
  {
    title: 'AML Alerts',
    purpose: 'Suspicious activity tracking',
    fields: ['Alert ID', 'Trigger Type', 'Risk Score', 'Account Freeze Toggle'],
  },
  {
    title: 'KYC / CDD',
    purpose: 'Know Your Customer tracking',
    fields: ['Document Type', 'Expiration Date', 'PEP Status', 'Next Review Date'],
  },
  {
    title: 'Sanctions Screening',
    purpose: 'Checking against global watchlists',
    fields: ['Match Percentage', 'Watchlist Source', 'Resolution Status'],
  },
];

const paymentWorkstreams = [
  {
    title: 'Mandates & Powers',
    purpose: 'Managing authorized signers',
    fields: ['POA Name', 'Authorization Limit', 'Mandate Expiry Date', 'Signature Preview'],
  },
  {
    title: 'Stop Payments',
    purpose: 'Blocking specific transactions',
    fields: ['Check Number Range', 'Payee Name', 'Stop Reason', 'Stop Order Expiry'],
  },
  {
    title: 'Beneficiary Management',
    purpose: 'Linking external accounts',
    fields: ['Beneficiary Name', 'Routing Number', 'Account Number', 'SWIFT / BIC'],
  },
];

const EmployeeOperations = () => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [form, setForm] = useState({ name: '', account: '', status: 'Active', balance: '' });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.account.trim()) {
      return;
    }

    setCustomers((current) => [
      ...current,
      {
        id: Date.now(),
        name: form.name,
        account: form.account,
        status: form.status,
        balance: form.balance || '$0.00',
      },
    ]);

    setForm({ name: '', account: '', status: 'Active', balance: '' });
  };

  return (
    <BankLayout title="Employee Operations" subtitle="Secure control center for branch operations, lending oversight, compliance, and payment controls." activePath="/employee-operations" role="employee">
      <div className="dashboard-grid">
        <section className="panel">
          <h3>Create new account</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="customerName">Customer name</label>
              <input id="customerName" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Enter customer name" />
            </div>
            <div className="form-group">
              <label htmlFor="accountNumber">Account number</label>
              <input id="accountNumber" value={form.account} onChange={(event) => setForm({ ...form, account: event.target.value })} placeholder="Enter account number" />
            </div>
            <div className="form-group">
              <label htmlFor="balance">Initial balance</label>
              <input id="balance" value={form.balance} onChange={(event) => setForm({ ...form, balance: event.target.value })} placeholder="Enter initial balance" />
            </div>
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select id="status" value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })}>
                <option value="Active">Active</option>
                <option value="Pending Review">Pending Review</option>
                <option value="Blocked">Blocked</option>
              </select>
            </div>
            <button className="primary-btn" type="submit">Submit account</button>
          </form>
        </section>

        <section className="panel">
          <h3>Customer management queue</h3>
          <div className="account-list">
            {customers.map((customer) => (
              <div key={customer.id} className="account-card">
                <div>
                  <h4>{customer.name}</h4>
                  <p className="muted">{customer.account}</p>
                </div>
                <div className="account-meta">
                  <strong>{customer.balance}</strong>
                  <span className="status-pill">{customer.status}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="operations-grid">
        <section className="panel">
          <h3>Branch Operations</h3>
          <div className="ops-list">
            {workstreams.map((item) => (
              <article key={item.title} className="ops-card">
                <h4>{item.title}</h4>
                <p className="muted">{item.purpose}</p>
                <ul>
                  {item.fields.map((field) => <li key={field}>{field}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="panel">
          <h3>Loan Operations</h3>
          <div className="ops-list">
            {lendingWorkstreams.map((item) => (
              <article key={item.title} className="ops-card">
                <h4>{item.title}</h4>
                <p className="muted">{item.purpose}</p>
                <ul>
                  {item.fields.map((field) => <li key={field}>{field}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </div>

      <div className="operations-grid">
        <section className="panel">
          <h3>Compliance & Risk</h3>
          <div className="ops-list">
            {complianceWorkstreams.map((item) => (
              <article key={item.title} className="ops-card">
                <h4>{item.title}</h4>
                <p className="muted">{item.purpose}</p>
                <ul>
                  {item.fields.map((field) => <li key={field}>{field}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="panel">
          <h3>Payments & Mandates</h3>
          <div className="ops-list">
            {paymentWorkstreams.map((item) => (
              <article key={item.title} className="ops-card">
                <h4>{item.title}</h4>
                <p className="muted">{item.purpose}</p>
                <ul>
                  {item.fields.map((field) => <li key={field}>{field}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </div>

    </BankLayout>
  );
};

export default EmployeeOperations;
