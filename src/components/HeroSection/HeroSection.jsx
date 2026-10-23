import { Link } from 'react-router-dom';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero">
      {/* Background glow orbs */}
      <div className="hero__bg-orb hero__bg-orb--blue" />
      <div className="hero__bg-orb hero__bg-orb--purple" />

      <div className="container hero__inner">

        {/* Text */}
        <div className="hero__content anim anim--left">
          <span className="hero__eyebrow">
            <span className="hero__eyebrow-dot" />
            New arrivals — Latest smartphones 2025
          </span>
          <h1 className="hero__heading">
            Find the <span className="hero__heading-accent">perfect phone</span> for you.
          </h1>
          <p className="hero__sub">
            Explore the latest smartphones from Apple, Samsung, OnePlus &amp; more.
            Genuine products, manufacturer warranty, competitive prices.
          </p>
          <div className="hero__badges">
            <span className="hero__badge">✓ Genuine Products</span>
            <span className="hero__badge">✓ Manufacturer Warranty</span>
            <span className="hero__badge">✓ Free Delivery</span>
          </div>
          <div className="hero__ctas">
            <Link to="/mobiles" className="hero__cta-primary">
              Shop Mobiles
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
            <Link to="/offers" className="hero__cta-secondary">View Offers</Link>
          </div>

          {/* Trust stats */}
          <div className="hero__stats">
            <div className="hero__stat">
              <span className="hero__stat-value">20+</span>
              <span className="hero__stat-label">Models</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-value">500+</span>
              <span className="hero__stat-label">Reviews</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-value">4.6★</span>
              <span className="hero__stat-label">Rating</span>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="hero__img-wrap anim anim--right">
          <div className="hero__img-glow" />
          <img
            src="/hero-phone.jpg"
            alt="Latest smartphones at MOBIX"
            className="hero__img"
          />
          <div className="hero__img-card hero__img-card--top anim-float">
            <span className="hero__img-card-icon">🏆</span>
            <div>
              <span className="hero__img-card-label">Best seller</span>
              <span className="hero__img-card-value">iPhone 16</span>
            </div>
          </div>
          <div className="hero__img-card hero__img-card--bottom anim-float--delayed">
            <span className="hero__img-card-icon">💰</span>
            <div>
              <span className="hero__img-card-label">Starting from</span>
              <span className="hero__img-card-value">₹9,999</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
