import BankLayout from './BankLayout';

const cards = [
  { name: 'Platinum', number: '•••• 4821', balance: '$12,840' },
  { name: 'Travel', number: '•••• 2189', balance: '$4,580' },
];

const offers = [
  { title: 'Jetsetter Rewards', description: '5x points on flights, hotels and dining worldwide.', bonus: '75k welcome points', tag: 'Travel rewards' },
  { title: 'Elite Cashback', description: '4% back on groceries, fuel, and streaming subscriptions.', bonus: '5% cashback on first 3 months', tag: 'Cashback' },
  { title: 'Secure Platinum', description: 'Low-intro APR and premium fraud protection with global acceptance.', bonus: 'No foreign transaction fees', tag: 'Security' },
  { title: 'Lifestyle Signature', description: 'Concierge service, lounge access, and mobile wallet perks.', bonus: 'Complimentary airport lounge visits', tag: 'Premium benefits' },
];

const customerDetails = [
  { label: 'Cardholder', value: 'Aarav Rao' },
  { label: 'Account tier', value: 'Premium Client' },
  { label: 'Credit score', value: '780' },
  { label: 'Next payment due', value: 'Aug 14, 2025' },
];

const CardsPage = () => {
  return (
    <BankLayout title="Cards" subtitle="Manage your virtual and physical cards in one place." activePath="/cards">
      <div className="dashboard-grid">
        <section className="panel">
          <h3>Your cards</h3>
          <div className="card-list">
            {cards.map((card) => (
              <div key={card.number} className="card-preview">
                <div className="card-chip" />
                <div>
                  <p className="muted">{card.name}</p>
                  <h4>{card.number}</h4>
                </div>
                <strong>{card.balance}</strong>
              </div>
            ))}
          </div>

          <div className="customer-fields">
            {customerDetails.map((field) => (
              <div key={field.label} className="customer-field">
                <span>{field.label}</span>
                <strong>{field.value}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <h3>New credit card offers</h3>
          <div className="offer-marquee" aria-label="Credit card offers">
            <div className="offer-track">
              {[...offers, ...offers].map((offer, index) => (
                <article key={`${offer.title}-${index}`} className="offer-slide">
                  <div className="offer-tag">{offer.tag}</div>
                  <h4>{offer.title}</h4>
                  <p>{offer.description}</p>
                  <p className="muted">{offer.bonus}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="panel" style={{ marginTop: '18px', background: 'rgba(255,255,255,0.06)' }}>
            <p className="muted">Daily limits</p>
            <ul className="goal-list">
              <li><span>ATM withdrawals</span><strong>$1,500</strong></li>
              <li><span>Online purchases</span><strong>$5,000</strong></li>
              <li><span>International use</span><strong>Enabled</strong></li>
            </ul>
          </div>
        </section>
      </div>
    </BankLayout>
  );
};

export default CardsPage;
