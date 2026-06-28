import BankLayout from './BankLayout';

const rewards = [
  {
    tier: 'Gold tier',
    points: '12,840 pts',
    benefit: '2x cashback on dining and travel',
    progress: 82,
  },
  {
    tier: 'Travel tier',
    points: '4,280 pts',
    benefit: 'Priority lounge access and fee waivers',
    progress: 56,
  },
];

const perks = [
  'No-fee international transactions',
  'Free ATM withdrawals worldwide',
  'Early access to premium offers',
];

const RewardsPage = () => {
  return (
    <BankLayout title="Rewards" subtitle="Turn everyday banking into premium-value perks." activePath="/rewards">
      <div className="dashboard-grid">
        <section className="panel">
          <h3>Reward balance</h3>
          <div className="metric-grid">
            <div className="metric-card">
              <div className="label">Points earned</div>
              <div className="value">18,420</div>
            </div>
            <div className="metric-card">
              <div className="label">Available rewards</div>
              <div className="value">6</div>
            </div>
            <div className="metric-card">
              <div className="label">Next milestone</div>
              <div className="value">Platinum</div>
            </div>
          </div>

          <div className="reward-list">
            {rewards.map((reward) => (
              <div key={reward.tier} className="reward-card">
                <div className="reward-top">
                  <strong>{reward.tier}</strong>
                  <span className="reward-pill">{reward.points}</span>
                </div>
                <p className="muted">{reward.benefit}</p>
                <div className="progress-bar" aria-label="reward progress">
                  <div className="progress-fill" style={{ width: `${reward.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <h3>Current perks</h3>
          <ul className="goal-list">
            {perks.map((perk) => (
              <li key={perk}><span>{perk}</span><strong>Active</strong></li>
            ))}
          </ul>
          <div className="action-grid">
            <button className="primary-btn" type="button">Redeem points</button>
            <button className="secondary-btn" type="button">Explore offers</button>
          </div>
        </section>
      </div>
    </BankLayout>
  );
};

export default RewardsPage;
