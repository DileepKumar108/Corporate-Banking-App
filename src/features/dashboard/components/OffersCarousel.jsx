import { useState, useEffect } from 'react';

const offers = [
  { id: 1, title: 'Premium Platinum Card', desc: '0% APR for 15 months on balance transfers. No annual fee.', color: '#1E3A8A' },
  { id: 2, title: 'High-Yield Savings', desc: 'Earn 5.20% APY on balances over $10,000. Grow your wealth faster.', color: '#047857' },
  { id: 3, title: 'Corporate Auto Loan', desc: 'Rates as low as 4.99% for executive vehicle financing.', color: '#B45309' }
];

const OffersCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % offers.length);
    }, 5000); // Rotate every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="card" style={{ padding: '0', overflow: 'hidden', position: 'relative', height: '140px', background: offers[currentIndex].color, color: 'white', transition: 'background 0.5s ease-in-out' }}>
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 }}>SPECIAL OFFER</span>
        </div>
        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', fontWeight: 700 }}>{offers[currentIndex].title}</h3>
        <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.9 }}>{offers[currentIndex].desc}</p>
      </div>
      
      {/* Navigation dots */}
      <div style={{ position: 'absolute', bottom: '1rem', right: '1.5rem', display: 'flex', gap: '6px' }}>
        {offers.map((offer, idx) => (
          <button
            key={offer.id}
            onClick={() => setCurrentIndex(idx)}
            style={{
              width: '8px', height: '8px', borderRadius: '50%', border: 'none', padding: 0,
              backgroundColor: idx === currentIndex ? 'white' : 'rgba(255,255,255,0.4)',
              cursor: 'pointer', transition: 'all 0.2s'
            }}
            aria-label={`View offer ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default OffersCarousel;
