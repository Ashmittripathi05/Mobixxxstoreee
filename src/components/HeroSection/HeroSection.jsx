import { Link } from 'react-router-dom';
import './HeroSection.css';

const ShieldIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <polyline points="9 12 11 14 15 10"/>
  </svg>
);

const WarrantyIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="7"/>
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
  </svg>
);

const TruckIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13"/>
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
    <circle cx="5.5" cy="18.5" r="2.5"/>
    <circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
);

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="container hero__inner">

        {/* Text */}
        <div className="hero__content anim anim--left">
          <span className="hero__eyebrow">
            <span className="hero__eyebrow-dot" />
            Certified Authentic • 2025 Mobile Collection
          </span>

          <h1 className="hero__heading">
            Find the perfect phone with <span className="hero__heading-accent">complete confidence</span>.
          </h1>

          <p className="hero__sub">
            Curated flagship and daily smartphones from Apple, Samsung, OnePlus &amp; Google.
            Full manufacturer warranty, transparent pricing, and instant doorstep delivery.
          </p>

          <div className="hero__badges">
            <span className="hero__badge">
              <ShieldIcon /> 100% Genuine Devices
            </span>
            <span className="hero__badge">
              <WarrantyIcon /> 1-Year Brand Warranty
            </span>
            <span className="hero__badge">
              <TruckIcon /> Free Express Delivery
            </span>
          </div>

          <div className="hero__ctas">
            <Link to="/mobiles" className="hero__cta-primary">
              Explore Smartphones
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
            <Link to="/offers" className="hero__cta-secondary">View Deals &amp; Offers</Link>
          </div>

          {/* Trust stats */}
          <div className="hero__stats">
            <div className="hero__stat">
              <span className="hero__stat-value">50+</span>
              <span className="hero__stat-label">Curated Models</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-value">15,000+</span>
              <span className="hero__stat-label">Happy Buyers</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-value">4.8 ★</span>
              <span className="hero__stat-label">Store Rating</span>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="hero__img-wrap anim anim--right">
          <img
            src="/hero-phone.jpg"
            alt="Latest smartphones at MOBIX"
            className="hero__img"
          />

          <div className="hero__img-card hero__img-card--top anim-float">
            <div className="hero__card-icon-wrap hero__card-icon-wrap--blue">
              <ShieldIcon />
            </div>
            <div>
              <span className="hero__img-card-label">Authorized Retailer</span>
              <span className="hero__img-card-value">100% Original Sealed Box</span>
            </div>
          </div>

          <div className="hero__img-card hero__img-card--bottom anim-float--delayed">
            <div className="hero__card-icon-wrap hero__card-icon-wrap--emerald">
              <TruckIcon />
            </div>
            <div>
              <span className="hero__img-card-label">Smart Exchange</span>
              <span className="hero__img-card-value">Up to ₹6,000 Extra Value</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
