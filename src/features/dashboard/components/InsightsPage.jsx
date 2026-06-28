import BankLayout from './BankLayout';

const InsightsPage = () => {
  return (
    <BankLayout title="Insights" subtitle="Track your financial health with smart recommendations." activePath="/insights">
      <div className="dashboard-grid">
        <section className="panel">
          <h3>Spend summary</h3>
          <div className="metric-grid">
            <div className="metric-card">
              <div className="label">This month</div>
              <div className="value">$8,940</div>
            </div>
            <div className="metric-card">
              <div className="label">Saved</div>
              <div className="value">$2,310</div>
            </div>
            <div className="metric-card">
              <div className="label">Invested</div>
              <div className="value">$7,400</div>
            </div>
          </div>
        </section>

        <section className="panel">
          <h3>Suggested actions</h3>
          <ul className="goal-list">
            <li><span>Increase savings by 8%</span><strong>Recommended</strong></li>
            <li><span>Set bill reminders</span><strong>Smart</strong></li>
            <li><span>Review card limits</span><strong>Quick</strong></li>
          </ul>
        </section>
      </div>
    </BankLayout>
  );
};

export default InsightsPage;
