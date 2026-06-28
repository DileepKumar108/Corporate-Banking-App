import { useDispatch, useSelector } from 'react-redux';
import { toggleCardLock } from '../store/dashboardSlice';
import BankLayout from './BankLayout';

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
  { label: 'Next payment due', value: 'Aug 14, 2026' },
];

const CardsPage = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.dashboard);

  const cardsList = data?.cards || [
    { name: 'Elite World Elite Mastercard', number: '•••• 4821', balance: '$12,840', locked: false },
    { name: 'Vanguard Visa Infinite', number: '•••• 2189', balance: '$4,580', locked: false }
  ];

  return (
    <BankLayout title="Cards" subtitle="Manage your virtual and physical cards in one place." activePath="/cards">
      <div className="dashboard-grid">
        <section className="panel">
          <h3>Your cards</h3>
          <div className="card-list">
            {cardsList.map((card) => (
              <div key={card.number} style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                <div className={`card-preview ${card.locked ? 'locked-card' : ''}`}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <p className="muted" style={{ margin: 0, textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px' }}>
                      {card.name}
                    </p>
                    <div className="card-chip" />
                  </div>
                  <div className="card-name-row">
                    <div>
                      <h4 style={{ margin: 0 }}>{card.number}</h4>
                      <p className="muted" style={{ margin: '4px 0 0 0', fontSize: '0.8rem' }}>AARAV RAO</p>
                    </div>
                    <strong>{card.balance}</strong>
                  </div>
                </div>
                <button 
                  className={`secondary-btn full-width ${card.locked ? 'primary-btn' : ''}`}
                  onClick={() => dispatch(toggleCardLock(card.number))}
                  type="button"
                >
                  {card.locked ? 'Unlock Card' : 'Lock Card'}
                </button>
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
                  <h4 style={{ margin: '12px 0 6px', fontSize: '1.05rem', fontWeight: 800 }}>{offer.title}</h4>
                  <p style={{ margin: '0 0 10px', fontSize: '0.85rem', opacity: 0.9 }}>{offer.description}</p>
                  <p className="muted" style={{ margin: 0, fontSize: '0.8rem', color: '#fff', fontWeight: 600 }}>{offer.bonus}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="panel" style={{ marginTop: '24px', background: 'rgba(255,255,255,0.03)', border: '1px dashed var(--border-color)' }}>
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
