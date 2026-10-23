import { Link } from 'react-router-dom';
import HeroSection from '../../components/HeroSection/HeroSection';
import BrandSection from '../../components/BrandSection/BrandSection';
import ProductCard from '../../components/ProductCard/ProductCard';
import WhyMobix from '../../components/WhyMobix/WhyMobix';
import ReviewSection from '../../components/ReviewSection/ReviewSection';
import { getFeaturedProducts } from '../../data/products';
import './Home.css';

const categories = [
  {
    id: 'flagship',
    icon: '🏆',
    label: 'Flagship',
    sub: 'Above ₹70,000',
    link: '/mobiles?price=above70k',
    color: '#F59E0B',
    bg: 'rgba(245,158,11,0.08)',
    border: 'rgba(245,158,11,0.2)',
  },
  {
    id: 'midrange',
    icon: '⚡',
    label: 'Mid-Range',
    sub: '₹20k – ₹70k',
    link: '/mobiles?price=midrange',
    color: '#3B82F6',
    bg: 'rgba(59,130,246,0.08)',
    border: 'rgba(59,130,246,0.2)',
  },
  {
    id: 'budget',
    icon: '💡',
    label: 'Budget',
    sub: 'Under ₹20,000',
    link: '/mobiles?price=under20k',
    color: '#34D399',
    bg: 'rgba(52,211,153,0.08)',
    border: 'rgba(52,211,153,0.2)',
  },
  {
    id: 'accessories',
    icon: '🎧',
    label: 'Accessories',
    sub: 'Cases, Chargers & More',
    link: '/accessories',
    color: '#A78BFA',
    bg: 'rgba(167,139,250,0.08)',
    border: 'rgba(167,139,250,0.2)',
  },
  {
    id: '5g',
    icon: '📡',
    label: '5G Phones',
    sub: 'Next-gen connectivity',
    link: '/mobiles?tag=5g',
    color: '#F87171',
    bg: 'rgba(248,113,113,0.08)',
    border: 'rgba(248,113,113,0.2)',
  },
  {
    id: 'offers',
    icon: '🔥',
    label: 'Hot Deals',
    sub: 'Limited time offers',
    link: '/offers',
    color: '#FB923C',
    bg: 'rgba(251,146,60,0.08)',
    border: 'rgba(251,146,60,0.2)',
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
              <p className="section-sub">Browse the collection that suits your budget and needs</p>
            </div>
          </div>
          <div className="categories-grid stagger-grid">
            {categories.map(cat => (
              <Link
                key={cat.id}
                to={cat.link}
                className="cat-card anim"
                style={{ '--cat-color': cat.color, '--cat-bg': cat.bg, '--cat-border': cat.border }}
              >
                <span className="cat-card__icon">{cat.icon}</span>
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

      {/* Offer Banners */}
      <section className="offer-banner-section">
        <div className="container">
          <div className="offer-banners">
            <div className="offer-banner offer-banner--exchange anim anim--left">
              <div className="offer-banner__bg-shape" />
              <div className="offer-banner__content">
                <span className="offer-banner__tag">Exchange Offer</span>
                <h3 className="offer-banner__title">Exchange your old phone</h3>
                <p className="offer-banner__sub">Get up to ₹5,000 extra exchange bonus on select models</p>
                <Link to="/offers" className="offer-banner__btn">Explore Offer →</Link>
              </div>
            </div>
            <div className="offer-banner offer-banner--student anim anim--right">
              <div className="offer-banner__bg-shape" />
              <div className="offer-banner__content">
                <span className="offer-banner__tag">Student Offer</span>
                <h3 className="offer-banner__title">Special student discounts</h3>
                <p className="offer-banner__sub">Exclusive pricing on selected smartphones for students</p>
                <Link to="/offers" className="offer-banner__btn offer-banner__btn--red">View Deals →</Link>
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
