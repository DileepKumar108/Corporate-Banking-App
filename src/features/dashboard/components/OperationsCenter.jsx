import BankLayout from './BankLayout';

const metrics = [
  { label: 'Uptime', value: '99.98%' },
  { label: 'Response time', value: '< 180ms' },
  { label: 'Deployments', value: '24/30d' },
];

const alerts = [
  'No critical production incidents in the last 24 hours.',
  'Security monitoring thresholds remain within expected limits.',
  'Performance benchmarks are tracking above service targets.',
];

const OperationsCenter = () => {
  return (
    <BankLayout title="Operations Center" subtitle="A production-style operations view for a modern engineering dashboard." activePath="/operations">
      <div className="dashboard-grid">
        <section className="panel">
          <h3>Service health</h3>
          <div className="metric-grid">
            {metrics.map((metric) => (
              <div key={metric.label} className="metric-card">
                <div className="label">{metric.label}</div>
                <div className="value">{metric.value}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <h3>Operational alerts</h3>
          <ul className="goal-list">
            {alerts.map((alert) => (
              <li key={alert}><span>{alert}</span><strong>Stable</strong></li>
            ))}
          </ul>
        </section>
      </div>
    </BankLayout>
  );
};

export default OperationsCenter;
