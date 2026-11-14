import { Link } from 'react-router-dom';
import HeroSection from '../../components/HeroSection/HeroSection';
import BrandSection from '../../components/BrandSection/BrandSection';
import ProductCard from '../../components/ProductCard/ProductCard';
import WhyMobix from '../../components/WhyMobix/WhyMobix';
import ReviewSection from '../../components/ReviewSection/ReviewSection';
import { getFeaturedProducts } from '../../data/products';
import './Home.css';

/* Professional SVG Icons for Categories */
const CrownIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14v2H5v-2z"/>
  </svg>
);

const BoltIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

const TagIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/>
    <line x1="7" y1="7" x2="7.01" y2="7"/>
  </svg>
);

const HeadphoneIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18v-6a9 9 0 0118 0v6"/>
    <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/>
  </svg>
);

const SignalIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 20h.01"/><path d="M7 20v-4"/><path d="M12 20v-8"/><path d="M17 20V8"/><path d="M22 4v16"/>
  </svg>
);

const PercentIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="5" x2="5" y2="19"/>
    <circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>
  </svg>
);

const categories = [
  {
    id: 'flagship',
    icon: <CrownIcon />,
    label: 'Flagship Tier',
    sub: 'Above ₹70,000',
    link: '/mobiles?price=above70k',
    tint: '#D97706',
    tintBg: '#FEF3C7',
  },
  {
    id: 'midrange',
    icon: <BoltIcon />,
    label: 'Mid-Range',
    sub: '₹20k – ₹70k',
    link: '/mobiles?price=midrange',
    tint: '#2563EB',
    tintBg: '#EFF6FF',
  },
  {
    id: 'budget',
    icon: <TagIcon />,
    label: 'Budget Smart',
    sub: 'Under ₹20,000',
    link: '/mobiles?price=under20k',
    tint: '#059669',
    tintBg: '#ECFDF5',
  },
  {
    id: 'accessories',
    icon: <HeadphoneIcon />,
    label: 'Accessories',
    sub: 'Audio, Cases & Power',
    link: '/accessories',
    tint: '#7C3AED',
    tintBg: '#F5F3FF',
  },
  {
    id: '5g',
    icon: <SignalIcon />,
    label: '5G Ready',
    sub: 'Next-Gen Speeds',
    link: '/mobiles?tag=5g',
    tint: '#0284C7',
    tintBg: '#F0F9FF',
  },
  {
    id: 'offers',
    icon: <PercentIcon />,
    label: 'Deals & Savings',
    sub: 'Limited Period Offers',
    link: '/offers',
    tint: '#E11D48',
    tintBg: '#FFF1F2',
  },
];

const Home = () => {
  const featured = getFeaturedProducts();

  return (
    <div className="page-wrapper">
      <HeroSection />

      <BrandSection />

      {/* Shop by Category */}
      <section className="categories-section">
        <div className="container">
          <div className="categories-header anim">
            <div>
              <h2 className="section-heading">Shop by Category</h2>
              <p className="section-sub">Curated collections aligned to your lifestyle and budget</p>
            </div>
          </div>
          <div className="categories-grid stagger-grid">
            {categories.map(cat => (
              <Link
                key={cat.id}
                to={cat.link}
                className="cat-card anim"
              >
                <div className="cat-card__icon-wrap" style={{ color: cat.tint, background: cat.tintBg }}>
                  {cat.icon}
                </div>
                <span className="cat-card__label">{cat.label}</span>
                <span className="cat-card__sub">{cat.sub}</span>
                <span className="cat-card__arrow">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Mobiles */}
      <section className="featured-section">
        <div className="container">
          <div className="featured-section__header anim">
            <div>
              <h2 className="section-heading">Featured Smartphones</h2>
              <p className="section-sub">Top picks this month — 100% genuine products, verified warranties</p>
            </div>
            <Link to="/mobiles" className="featured-section__view-all">View all phones →</Link>
          </div>
          <div className="featured-grid stagger-grid">
            {featured.map(product => (
              <ProductCard key={product.id} product={product} className="anim" />
            ))}
          </div>
        </div>
      </section>

      {/* Offer Banners */}
      <section className="offer-banner-section">
        <div className="container">
          <div className="offer-banners">
            {/* Trade In */}
            <div className="offer-banner offer-banner--exchange anim anim--left">
              <div className="offer-banner__content">
                <span className="offer-banner__tag">Smart Trade-In</span>
                <h3 className="offer-banner__title">Exchange your old device for instant credit</h3>
                <p className="offer-banner__sub">Get up to ₹6,000 extra exchange value + doorstep pickup on eligible models.</p>
                <Link to="/offers" className="offer-banner__btn">Calculate Trade-in Value →</Link>
              </div>
            </div>

            {/* Privilege deals */}
            <div className="offer-banner offer-banner--student anim anim--right">
              <div className="offer-banner__content">
                <span className="offer-banner__tag offer-banner__tag--blue">Student &amp; Bank Offers</span>
                <h3 className="offer-banner__title">Special discounts on premium smartphones</h3>
                <p className="offer-banner__sub">Instant bank cashback of up to ₹4,000 plus exclusive student verification discounts.</p>
                <Link to="/offers" className="offer-banner__btn offer-banner__btn--accent">Claim Offers →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WhyMobix />

      <ReviewSection />
    </div>
  );
};

export default Home;
