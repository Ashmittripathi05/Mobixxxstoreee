import { Link } from 'react-router-dom';
import './Offers.css';

const offers = [
  {
    id: 1,
    tag: 'Exchange Offer',
    title: 'Exchange your old phone — Get up to ₹5,000 extra',
    desc: 'Exchange any old smartphone and get up to ₹5,000 additional exchange bonus on selected models. Valid on all Apple and Samsung flagship purchases.',
    badge: '+ ₹5,000 Extra',
    badgeType: 'blue',
    validity: 'Valid till 31 October 2025',
    cta: 'Shop iPhones',
    ctaLink: '/mobiles?brand=Apple',
  },
  {
    id: 2,
    tag: 'Student Offer',
    title: 'Student discount on selected smartphones',
    desc: 'Valid student ID required. Get up to 8% off on select smartphones from OnePlus, Xiaomi, and Realme. Only one offer per student per transaction.',
    badge: 'Up to 8% Off',
    badgeType: 'orange',
    validity: 'Ongoing — valid student ID required',
    cta: 'Shop OnePlus',
    ctaLink: '/mobiles?brand=OnePlus',
  },
  {
    id: 3,
    tag: 'Bank Offer',
    title: 'Save more with select bank cards',
    desc: 'Get ₹2,000 instant cashback on purchases above ₹40,000 with HDFC Bank, ICICI Bank, or Axis Bank credit/debit cards. T&C apply.',
    badge: '₹2,000 Cashback',
    badgeType: 'green',
    validity: 'Valid till 30 September 2025. T&C apply.',
    cta: 'View Eligible Phones',
    ctaLink: '/mobiles',
  },
  {
    id: 4,
    tag: 'No Cost EMI',
    title: 'Zero cost EMI on purchases above ₹15,000',
    desc: 'Shop your favourite smartphone and pay in easy EMIs at 0% interest with select bank cards. Available on tenures of 3, 6, 9, and 12 months.',
    badge: '0% Interest EMI',
    badgeType: 'purple',
    validity: 'Applicable on select cards',
    cta: 'Browse All Phones',
    ctaLink: '/mobiles',
  },
  {
    id: 5,
    tag: 'Accessories Combo',
    title: 'Buy phone + accessories, save up to ₹1,500',
    desc: 'Purchase any smartphone along with a compatible case, screen guard, or earphones from our accessories range and get up to ₹1,500 off on the accessories.',
    badge: 'Up to ₹1,500 Off',
    badgeType: 'blue',
    validity: 'Valid on combo purchases only',
    cta: 'View Accessories',
    ctaLink: '/accessories',
  },
  {
    id: 6,
    tag: 'Diwali Sale',
    title: 'Upcoming Diwali Mega Sale',
    desc: 'Get ready for the biggest sale of the year. Subscribe to our newsletter to get early access to exclusive Diwali discounts on all brands.',
    badge: 'Coming Soon',
    badgeType: 'red',
    validity: 'Starting 20 October 2025',
    cta: 'Know More',
    ctaLink: '/offers',
  },
];

const Offers = () => {
  return (
    <div className="page-wrapper">
      <div className="container offers-page">
        <div className="offers-header">
          <h1 className="section-heading" style={{ fontSize: '24px' }}>Current Offers & Deals</h1>
          <p className="section-sub">
            Promotional offers below are for demo purposes only and may not reflect actual pricing or availability.
          </p>
        </div>

        <div className="offers-grid">
          {offers.map(offer => (
            <div key={offer.id} className={`offer-card offer-card--${offer.badgeType}`}>
              <div className="offer-card__header">
                <span className="offer-card__tag">{offer.tag}</span>
                <span className={`offer-card__badge offer-card__badge--${offer.badgeType}`}>{offer.badge}</span>
              </div>
              <h2 className="offer-card__title">{offer.title}</h2>
              <p className="offer-card__desc">{offer.desc}</p>
              <div className="offer-card__footer">
                <span className="offer-card__validity">🗓 {offer.validity}</span>
                <Link to={offer.ctaLink} className="btn btn-navy btn-sm">{offer.cta}</Link>
              </div>
            </div>
          ))}
        </div>

        <div className="offers-disclaimer">
          <strong>Disclaimer:</strong> All offers shown above are for demonstration purposes only. MOBIX is a demo website. No real transactions, payments, or discounts are applied. Prices and offers may not reflect actual market rates.
        </div>
      </div>
    </div>
  );
};

export default Offers;
