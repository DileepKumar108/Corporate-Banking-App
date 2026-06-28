import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeTransfer } from '../store/dashboardSlice';
import BankLayout from './BankLayout';

const TransfersPage = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.dashboard);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [toast, setToast] = useState('');

  const handleTransfer = (e) => {
    e.preventDefault();
    if (!recipient.trim() || !amount) return;

    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    if (data.accounts[0].balance < amt) {
      alert('Insufficient funds in Platinum Checking!');
      return;
    }

    dispatch(makeTransfer({ amount, recipient }));
    setToast(`Sent $${amt.toFixed(2)} to ${recipient} successfully!`);
    setRecipient('');
    setAmount('');

    setTimeout(() => {
      setToast('');
    }, 4000);
  };

  const transferHistory = (data?.recentTransactions || []).filter(tx => tx.description.startsWith('Transfer to'));

  return (
    <BankLayout title="Transfers" subtitle="Move money securely between accounts and recipients." activePath="/transfers">
      {toast && (
        <div className="toast-msg">
          <span style={{ color: 'var(--accent-cyan)' }}>✓</span>
          <span>{toast}</span>
        </div>
      )}

      <div className="dashboard-grid">
        <section className="panel">
          <h3>Send money</h3>
          <form onSubmit={handleTransfer} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label htmlFor="recipient">Recipient name / account</label>
              <input
                id="recipient"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Enter recipient name or account number"
                required
              />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label htmlFor="amount">Transfer amount ($)</label>
              <input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                min="1"
                step="any"
                required
              />
            </div>
            <button className="primary-btn" type="submit" style={{ marginTop: '8px' }}>
              Confirm transfer
            </button>
          </form>
        </section>

        <section className="panel">
          <h3>Transfer history</h3>
          <ul className="transaction-list">
            {transferHistory.length > 0 ? (
              transferHistory.map((tx) => (
                <li key={tx.id}>
                  <span>
                    <strong>{tx.description}</strong>
                    <div className="muted">{tx.date}</div>
                  </span>
                  <strong style={{ color: 'var(--accent-red)' }}>
                    ${Math.abs(parseFloat(tx.amount)).toFixed(2)}
                  </strong>
                </li>
              ))
            ) : (
              <p className="muted" style={{ textAlign: 'center', marginTop: '40px' }}>
                No recent transfers found.
              </p>
            )}
          </ul>
        </section>
      </div>
    </BankLayout>
  );
};

export default TransfersPage;
