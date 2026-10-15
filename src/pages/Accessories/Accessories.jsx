import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { accessories, accessoryCategories } from '../../data/accessories';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import './Accessories.css';

const HeartIcon = ({ filled }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
  </svg>
);

const Accessories = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const filtered = activeCategory === 'all'
    ? accessories
    : accessories.filter(a => a.category === activeCategory);

  const handleAddToCart = (e, item) => {
    e.stopPropagation();
    addToCart(item, null, null);
    addToast(`${item.name} added to cart`);
  };

  const handleWishlist = (e, id, name) => {
    e.stopPropagation();
    const was = isWishlisted(id);
    toggleWishlist(id);
    addToast(was ? `Removed from wishlist` : `Added to wishlist`, was ? 'info' : 'success');
  };

  return (
    <div className="page-wrapper">
      <div className="container accessories-page">
        <div className="accessories-header">
          <h1 className="section-heading" style={{ fontSize: '24px' }}>Accessories</h1>
          <p className="section-sub">Phone cases, earphones, chargers, power banks, and more</p>
        </div>

        {/* Category tabs */}
        <div className="acc-category-tabs">
          {accessoryCategories.map(cat => (
            <button
              key={cat.id}
              className={`acc-cat-tab${activeCategory === cat.id ? ' acc-cat-tab--active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="acc-grid">
          {filtered.map(item => {
            const wishlisted = isWishlisted(item.id);
            return (
              <div
                key={item.id}
                className="acc-card"
                onClick={() => {}}
                role="button"
              >
                <div className="acc-card__img-wrap">
                  {item.discount > 20 && (
                    <span className="acc-card__badge">-{item.discount}%</span>
                  )}
                  <button
                    className={`acc-card__wishlist${wishlisted ? ' acc-card__wishlist--active' : ''}`}
                    onClick={e => handleWishlist(e, item.id, item.name)}
                  >
                    <HeartIcon filled={wishlisted} />
                  </button>
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    onError={e => { e.target.style.display = 'none'; }}
                  />
                </div>
                <div className="acc-card__body">
                  <p className="acc-card__brand">{item.brand}</p>
                  <h3 className="acc-card__name">{item.name}</h3>
                  <div className="acc-card__pricing">
                    <span className="price-current" style={{ fontSize: '15px' }}>₹{item.price.toLocaleString('en-IN')}</span>
                    {item.originalPrice > item.price && (
                      <span className="price-original">₹{item.originalPrice.toLocaleString('en-IN')}</span>
                    )}
                  </div>
                  <button
                    className="btn btn-primary btn-sm acc-card__btn"
                    onClick={e => handleAddToCart(e, item)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Accessories;
