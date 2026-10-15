import { Link } from 'react-router-dom';
import HeroSection from '../../components/HeroSection/HeroSection';
import BrandSection from '../../components/BrandSection/BrandSection';
import ProductCard from '../../components/ProductCard/ProductCard';
import WhyMobix from '../../components/WhyMobix/WhyMobix';
import ReviewSection from '../../components/ReviewSection/ReviewSection';
import { getFeaturedProducts } from '../../data/products';
import './Home.css';

const Home = () => {
  const featured = getFeaturedProducts();

  return (
    <div className="page-wrapper">
      <HeroSection />

      <BrandSection />

      {/* Featured Mobiles */}
      <section className="featured-section">
        <div className="container">
          <div className="featured-section__header anim">
            <div>
              <h2 className="section-heading">Featured Mobiles</h2>
              <p className="section-sub">Top picks this month — genuine products, best prices</p>
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

      {/* Offer Banner */}
      <section className="offer-banner-section">
        <div className="container">
          <div className="offer-banners">
            <div className="offer-banner offer-banner--exchange anim anim--left">
              <div className="offer-banner__content">
                <span className="offer-banner__tag">Exchange Offer</span>
                <h3 className="offer-banner__title">Exchange your old phone</h3>
                <p className="offer-banner__sub">Get up to ₹5,000 extra exchange bonus on select models</p>
                <Link to="/offers" className="btn btn-navy btn-sm">Explore Offer</Link>
              </div>
            </div>
            <div className="offer-banner offer-banner--student anim anim--right">
              <div className="offer-banner__content">
                <span className="offer-banner__tag">Student Offer</span>
                <h3 className="offer-banner__title">Special student discounts</h3>
                <p className="offer-banner__sub">Exclusive pricing on selected smartphones for students</p>
                <Link to="/offers" className="btn btn-navy btn-sm">View Deals</Link>
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
