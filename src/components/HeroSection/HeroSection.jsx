import { Link } from 'react-router-dom';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="container hero__inner">

        {/* Text */}
        <div className="hero__content anim anim--left">
          <span className="hero__eyebrow">New arrivals — Latest smartphones</span>
          <h1 className="hero__heading">Find the right phone for you.</h1>
          <p className="hero__sub">
            Explore the latest smartphones, compare features and get genuine products at competitive prices.
          </p>
          <div className="hero__badges">
            <span className="hero__badge">✓ Genuine Products</span>
            <span className="hero__badge">✓ Manufacturer Warranty</span>
            <span className="hero__badge">✓ Free Delivery</span>
          </div>
          <div className="hero__ctas">
            <Link to="/mobiles" className="btn btn-navy btn-lg">Shop Mobiles</Link>
            <Link to="/offers" className="btn btn-outline btn-lg">View Offers</Link>
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
            <span className="hero__img-card-label">Best seller</span>
            <span className="hero__img-card-value">iPhone 16</span>
          </div>
          <div className="hero__img-card hero__img-card--bottom anim-float--delayed">
            <span className="hero__img-card-label">Starting from</span>
            <span className="hero__img-card-value">₹9,999</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
