import { useState } from 'react';
import { useSelector } from 'react-redux';

const LoanApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    ssn: '',
    employment: '',
    annualIncome: '',
    loanAmount: '',
    loanType: 'Personal',
    purpose: '',
    existingDebts: '',
    totalAssets: ''
  });
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const token = useSelector((state) => state.auth.token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus('');

    try {
      const res = await fetch('http://localhost:3000/api/applications/loan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error('Failed to submit application');
      setStatus('Your comprehensive loan application has been submitted to the underwriting department.');
      setFormData({ fullName: '', ssn: '', employment: '', annualIncome: '', loanAmount: '', loanType: 'Personal', purpose: '', existingDebts: '', totalAssets: '' });
    } catch (err) {
      setStatus('Secure submission failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="card" style={{ marginTop: '2rem' }}>
      <div className="card-header">
        <h3 className="heading-2" style={{ margin: 0 }}>Corporate Loan Underwriting</h3>
      </div>
      <p className="text-muted" style={{ marginBottom: '1.5rem' }}>Complete this secure application for comprehensive credit and risk assessment.</p>

      {status && (
        <div style={{ padding: '1rem', marginBottom: '1.5rem', backgroundColor: status.includes('failed') ? '#FEE2E2' : '#ECFDF5', color: status.includes('failed') ? '#991B1B' : '#065F46', borderRadius: '8px' }}>
          {status}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div className="input-group">
          <label className="input-label">Full Legal Name</label>
          <input className="input-field" required value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
        </div>
        <div className="input-group">
          <label className="input-label">Social Security Number</label>
          <input className="input-field" type="password" required placeholder="XXX-XX-XXXX" value={formData.ssn} onChange={e => setFormData({...formData, ssn: e.target.value})} />
        </div>
        
        <div className="input-group">
          <label className="input-label">Current Employer</label>
          <input className="input-field" required value={formData.employment} onChange={e => setFormData({...formData, employment: e.target.value})} />
        </div>
        <div className="input-group">
          <label className="input-label">Annual Income (USD)</label>
          <input className="input-field" type="number" required value={formData.annualIncome} onChange={e => setFormData({...formData, annualIncome: e.target.value})} />
        </div>

        <div className="input-group">
          <label className="input-label">Total Monthly Debt Payments</label>
          <input className="input-field" type="number" required placeholder="Rent, mortgages, credit cards" value={formData.existingDebts} onChange={e => setFormData({...formData, existingDebts: e.target.value})} />
        </div>
        <div className="input-group">
          <label className="input-label">Total Liquid Assets</label>
          <input className="input-field" type="number" required value={formData.totalAssets} onChange={e => setFormData({...formData, totalAssets: e.target.value})} />
        </div>

        <div className="input-group">
          <label className="input-label">Loan Type</label>
          <select className="input-field" value={formData.loanType} onChange={e => setFormData({...formData, loanType: e.target.value})}>
            <option value="Personal">Personal Loan</option>
            <option value="Mortgage">Mortgage</option>
            <option value="Auto">Auto Finance</option>
            <option value="Business">Small Business Line of Credit</option>
          </select>
        </div>
        <div className="input-group">
          <label className="input-label">Requested Amount (USD)</label>
          <input className="input-field" type="number" required value={formData.loanAmount} onChange={e => setFormData({...formData, loanAmount: e.target.value})} />
        </div>

        <div className="input-group" style={{ gridColumn: '1 / -1' }}>
          <label className="input-label">Detailed Purpose of Loan</label>
          <textarea className="input-field" rows="3" required value={formData.purpose} onChange={e => setFormData({...formData, purpose: e.target.value})}></textarea>
        </div>

        <button type="submit" className="btn-primary full-width" style={{ gridColumn: '1 / -1', marginTop: '1rem' }} disabled={submitting}>
          {submitting ? 'Running Risk Assessment...' : 'Submit Application'}
        </button>
      </form>
    </section>
  );
};

export default LoanApplicationForm;
