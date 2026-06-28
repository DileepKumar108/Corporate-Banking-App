import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCustomer,
  createCustomer,
  updateCustomerStatus,
  updateCustomerContact,
  reverseFee,
  verifyKyc,
  makeTransfer
} from '../store/dashboardSlice';
import BankLayout from './BankLayout';

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
  const dispatch = useDispatch();
  const { data, selectedCustomerId } = useSelector((state) => state.dashboard);

  const [createForm, setCreateForm] = useState({ name: '', account: '', status: 'Active', balance: '' });
  const [activeTab, setActiveTab] = useState('profile-kyc'); // tabs: profile-kyc, quick-transfer, status-cards, contact, fee-reversals

  // State for contact updates form
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  // State for manual quick transfer on behalf of customer
  const [transferRecipient, setTransferRecipient] = useState('');
  const [transferAmount, setTransferAmount] = useState('');

  const selectedCustomer = data?.customers?.find(c => c.id === selectedCustomerId) || data?.customers?.[0];

  const handleSelectCustomer = (id) => {
    dispatch(selectCustomer(id));
    const cust = data?.customers?.find(c => c.id === id);
    if (cust) {
      setContactEmail(cust.email);
      setContactPhone(cust.phone);
    }
  };

  const handleCreateCustomer = (e) => {
    e.preventDefault();
    if (!createForm.name.trim() || !createForm.account.trim()) return;

    dispatch(createCustomer(createForm));
    setCreateForm({ name: '', account: '', status: 'Active', balance: '' });
    alert('Customer account successfully queued!');
  };

  const handleUpdateContact = (e) => {
    e.preventDefault();
    if (!selectedCustomer) return;

    dispatch(updateCustomerContact({
      id: selectedCustomer.id,
      email: contactEmail || selectedCustomer.email,
      phone: contactPhone || selectedCustomer.phone
    }));
    alert('Contact details updated successfully!');
  };

  const handleExecuteTransfer = (e) => {
    e.preventDefault();
    if (!selectedCustomer || !transferRecipient.trim() || !transferAmount) return;

    const amt = parseFloat(transferAmount);
    if (isNaN(amt) || amt <= 0) return;

    if (selectedCustomer.balance < amt) {
      alert('Insufficient customer balance!');
      return;
    }

    // Reuse makeTransfer to perform the operation (which deducts assets)
    // and manually deduct customer balance
    dispatch(makeTransfer({ amount: transferAmount, recipient: transferRecipient }));
    dispatch(updateCustomerStatus({ id: selectedCustomer.id, status: selectedCustomer.status })); // trigger re-render
    
    // Locally adjust selected customer balance for employee dashboard queue visibility
    selectedCustomer.balance -= amt;

    alert(`Transfer of $${amt.toFixed(2)} to ${transferRecipient} executed successfully on behalf of ${selectedCustomer.name}.`);
    setTransferRecipient('');
    setTransferAmount('');
  };

  const handleVerifyKyc = () => {
    if (!selectedCustomer) return;
    dispatch(verifyKyc(selectedCustomer.id));
    alert('KYC verification complete! Customer account status upgraded to Active.');
  };

  const handleStatusChange = (newStatus) => {
    if (!selectedCustomer) return;
    dispatch(updateCustomerStatus({ id: selectedCustomer.id, status: newStatus }));
  };

  const handleReverseFee = (fee) => {
    if (!selectedCustomer) return;
    dispatch(reverseFee({
      customerId: selectedCustomer.id,
      feeId: fee.id,
      amount: fee.amount
    }));
    alert(`Fee of $${fee.amount} reversed. Balance updated to $${selectedCustomer.balance + fee.amount}.`);
  };

  return (
    <BankLayout title="Employee Operations" subtitle="Secure control center for branch operations, lending oversight, compliance, and payment controls." activePath="/employee-operations" role="employee">
      
      {/* Top dashboard section */}
      <div className="dashboard-grid">
        <section className="panel">
          <h3>Create new account</h3>
          <form onSubmit={handleCreateCustomer} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label htmlFor="customerName">Customer name</label>
              <input 
                id="customerName" 
                value={createForm.name} 
                onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })} 
                placeholder="Enter customer name" 
                required 
              />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label htmlFor="accountNumber">Account number</label>
              <input 
                id="accountNumber" 
                value={createForm.account} 
                onChange={(e) => setCreateForm({ ...createForm, account: e.target.value })} 
                placeholder="Enter account number" 
                required 
              />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label htmlFor="balance">Initial balance</label>
              <input 
                id="balance" 
                value={createForm.balance} 
                onChange={(e) => setCreateForm({ ...createForm, balance: e.target.value })} 
                placeholder="e.g. $10,000" 
              />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label htmlFor="status">Status</label>
              <select 
                id="status" 
                value={createForm.status} 
                onChange={(e) => setCreateForm({ ...createForm, status: e.target.value })}
              >
                <option value="Active">Active</option>
                <option value="Pending Review">Pending Review</option>
                <option value="Blocked">Blocked</option>
              </select>
            </div>
            <button className="primary-btn" type="submit" style={{ marginTop: '8px' }}>Submit account</button>
          </form>
        </section>

        <section className="panel" style={{ display: 'flex', flexDirection: 'column', justifyBetween: 'space-between' }}>
          <h3>Customer management queue</h3>
          <div className="queue-list" style={{ flex: 1, overflowY: 'auto', maxHeight: '380px' }}>
            {(data?.customers || []).map((customer) => (
              <div 
                key={customer.id} 
                className={`queue-card ${selectedCustomer?.id === customer.id ? 'selected-active' : ''}`}
                onClick={() => handleSelectCustomer(customer.id)}
              >
                <div>
                  <h4 style={{ margin: '0 0 4px' }}>{customer.name}</h4>
                  <p className="muted" style={{ margin: 0, fontSize: '0.82rem' }}>{customer.account}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <strong style={{ display: 'block', fontSize: '1.05rem', marginBottom: '4px' }}>
                    ${customer.balance.toLocaleString()}
                  </strong>
                  <span className={`status-pill ${customer.status.toLowerCase().replace(/\s+/g, '-')}`}>
                    {customer.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Selected customer servicing workspace */}
      {selectedCustomer && (
        <section className="panel" style={{ marginTop: '24px' }}>
          <h3>Servicing Console: {selectedCustomer.name}</h3>
          
          <div className="tab-menu">
            <button 
              className={`tab-btn ${activeTab === 'profile-kyc' ? 'active' : ''}`} 
              onClick={() => setActiveTab('profile-kyc')}
              type="button"
            >
              Profile & KYC
            </button>
            <button 
              className={`tab-btn ${activeTab === 'quick-transfer' ? 'active' : ''}`} 
              onClick={() => setActiveTab('quick-transfer')}
              type="button"
            >
              Quick Transfer
            </button>
            <button 
              className={`tab-btn ${activeTab === 'status-cards' ? 'active' : ''}`} 
              onClick={() => setActiveTab('status-cards')}
              type="button"
            >
              Account & Cards
            </button>
            <button 
              className={`tab-btn ${activeTab === 'contact' ? 'active' : ''}`} 
              onClick={() => setActiveTab('contact')}
              type="button"
            >
              Contact Updates
            </button>
            <button 
              className={`tab-btn ${activeTab === 'fee-reversals' ? 'active' : ''}`} 
              onClick={() => setActiveTab('fee-reversals')}
              type="button"
            >
              Fee Reversals
            </button>
          </div>

          <div className="servicing-content">
            {activeTab === 'profile-kyc' && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '40px' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <p><strong>Customer Name:</strong> {selectedCustomer.name}</p>
                  <p><strong>Account Identifier:</strong> {selectedCustomer.account}</p>
                  <p><strong>KYC Verification Status:</strong> {selectedCustomer.kycVerified ? 'Verified ✓' : 'Pending Verification ⚠'}</p>
                  <p><strong>Politically Exposed Person (PEP) Status:</strong> {selectedCustomer.pepStatus}</p>
                </div>
                <div>
                  {!selectedCustomer.kycVerified ? (
                    <button className="primary-btn" onClick={handleVerifyKyc} type="button">
                      Complete KYC Verification
                    </button>
                  ) : (
                    <button className="secondary-btn" disabled type="button" style={{ cursor: 'not-allowed', color: 'var(--accent-green)' }}>
                      KYC Verification Complete
                    </button>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'quick-transfer' && (
              <form onSubmit={handleExecuteTransfer} style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '500px' }}>
                <p className="muted" style={{ margin: 0 }}>Initiate an external transfer directly on behalf of this customer.</p>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="servicing-recipient">Beneficiary name / account</label>
                  <input
                    id="servicing-recipient"
                    value={transferRecipient}
                    onChange={(e) => setTransferRecipient(e.target.value)}
                    placeholder="Enter recipient"
                    required
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="servicing-amount">Amount ($)</label>
                  <input
                    id="servicing-amount"
                    type="number"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    placeholder="0.00"
                    min="1"
                    required
                  />
                </div>
                <button className="primary-btn" type="submit">
                  Execute transfer
                </button>
              </form>
            )}

            {activeTab === 'status-cards' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <label htmlFor="servicing-status" style={{ fontWeight: 600 }}>Change customer account state:</label>
                  <select 
                    id="servicing-status" 
                    value={selectedCustomer.status} 
                    onChange={(e) => handleStatusChange(e.target.value)}
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: '#fff', padding: '10px 14px', borderRadius: '10px' }}
                  >
                    <option value="Active">Active</option>
                    <option value="Pending Review">Pending Review</option>
                    <option value="Blocked">Blocked</option>
                  </select>
                </div>
                
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
                  <h4>Active Cards</h4>
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Card Name</th>
                        <th>Card Number</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(data?.cards || []).map((card) => (
                        <tr key={card.number}>
                          <td>{card.name}</td>
                          <td>{card.number}</td>
                          <td>
                            <span className={`status-pill ${card.locked ? 'blocked' : 'active'}`}>
                              {card.locked ? 'Locked' : 'Active'}
                            </span>
                          </td>
                          <td>
                            <button className="secondary-btn" style={{ padding: '6px 12px', fontSize: '0.8rem' }} type="button">
                              Reset Pin
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'contact' && (
              <form onSubmit={handleUpdateContact} style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '500px' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="contact-email">Email address</label>
                  <input
                    id="contact-email"
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder={selectedCustomer.email}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="contact-phone">Phone number</label>
                  <input
                    id="contact-phone"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder={selectedCustomer.phone}
                  />
                </div>
                <button className="primary-btn" type="submit">
                  Save Changes
                </button>
              </form>
            )}

            {activeTab === 'fee-reversals' && (
              <div>
                <p className="muted" style={{ margin: '0 0 16px' }}>Fee management database for {selectedCustomer.name}</p>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Fee ID</th>
                      <th>Description</th>
                      <th>Amount</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(data?.fees || []).map((fee) => (
                      <tr key={fee.id}>
                        <td>{fee.id}</td>
                        <td>{fee.description}</td>
                        <td>${fee.amount.toFixed(2)}</td>
                        <td>{fee.date}</td>
                        <td>
                          <span className={`status-pill ${fee.status === 'Charged' ? 'blocked' : 'active'}`}>
                            {fee.status}
                          </span>
                        </td>
                        <td>
                          {fee.status === 'Charged' ? (
                            <button 
                              className="primary-btn" 
                              style={{ padding: '6px 12px', fontSize: '0.8rem' }} 
                              onClick={() => handleReverseFee(fee)}
                              type="button"
                            >
                              Reverse Fee
                            </button>
                          ) : (
                            <span style={{ color: 'var(--accent-green)', fontSize: '0.85rem', fontWeight: 600 }}>
                              Reversal Approved
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Static operational workstream lists below for tests */}
      <div className="operations-grid" style={{ marginTop: '32px' }}>
        <section className="panel">
          <h3>Branch Operations</h3>
          <div className="ops-list">
            {workstreams.map((item) => (
              <article key={item.title} className="ops-card">
                <h4>{item.title}</h4>
                <p className="muted" style={{ fontSize: '0.85rem', margin: '0 0 8px' }}>{item.purpose}</p>
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
                <p className="muted" style={{ fontSize: '0.85rem', margin: '0 0 8px' }}>{item.purpose}</p>
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
                <p className="muted" style={{ fontSize: '0.85rem', margin: '0 0 8px' }}>{item.purpose}</p>
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
                <p className="muted" style={{ fontSize: '0.85rem', margin: '0 0 8px' }}>{item.purpose}</p>
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
