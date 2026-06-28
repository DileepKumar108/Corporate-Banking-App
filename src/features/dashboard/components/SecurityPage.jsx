import BankLayout from './BankLayout';

const SecurityPage = () => {
  return (
    <BankLayout title="Security" subtitle="Your account is protected with smart monitoring and safeguards." activePath="/security">
      <div className="dashboard-grid">
        <section className="panel">
          <h3>Protection score</h3>
          <div className="metric-card" style={{ marginTop: '12px' }}>
            <div className="label">Score</div>
            <div className="value">97 / 100</div>
          </div>
        </section>

        <section className="panel">
          <h3>Active safeguards</h3>
          <ul className="goal-list">
            <li><span>Biometric sign-in</span><strong>On</strong></li>
            <li><span>Suspicious activity alerts</span><strong>On</strong></li>
            <li><span>Fraud monitoring</span><strong>Live</strong></li>
          </ul>
        </section>
      </div>
    </BankLayout>
  );
};

export default SecurityPage;
