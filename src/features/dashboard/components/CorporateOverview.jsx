import BankLayout from './BankLayout';

const highlights = [
  'Executive-grade dashboard experience',
  'Secure multi-module banking workspace',
  'Structured reusable frontend architecture',
];

const CorporateOverview = () => {
  return (
    <BankLayout title="Corporate Overview" subtitle="A polished, enterprise-oriented banking experience for professional showcase." activePath="/corporate">
      <div className="dashboard-grid">
        <section className="panel">
          <p className="muted">Portfolio presentation</p>
          <h3>Designed to reflect a modern corporate product experience.</h3>
          <p className="muted">
            This interface combines clarity, structure, and visual hierarchy to deliver a strong impression for recruiters,
            stakeholders, and product-focused teams.
          </p>
          <div className="action-grid">
            <button className="primary-btn" type="button">Showcase now</button>
            <button className="secondary-btn" type="button">Review architecture</button>
          </div>
        </section>

        <section className="panel">
          <h3>Why it stands out</h3>
          <ul className="goal-list">
            {highlights.map((item) => (
              <li key={item}><span>{item}</span><strong>Ready</strong></li>
            ))}
          </ul>
        </section>
      </div>
    </BankLayout>
  );
};

export default CorporateOverview;
