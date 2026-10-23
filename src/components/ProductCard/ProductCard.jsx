import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import './ProductCard.css';

const HeartIcon = ({ filled }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
  </svg>
);

const CartIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 01-8 0"/>
  </svg>
);

const StarRating = ({ rating }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <div className="stars">
      {[1,2,3,4,5].map(i => (
        <span key={i} className={`star ${i <= full ? '' : (i === full + 1 && half ? 'star-half' : 'star-empty')}`}>★</span>
      ))}
    </div>
  );
};

const ProductCard = ({ product, className = '' }) => {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);
  const [adding, setAdding] = useState(false);

  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAdding(true);
    addToCart(product, product.storageOptions?.[0], product.ramOptions?.[0]);
    addToast(`${product.name} added to cart`);
    setTimeout(() => setAdding(false), 600);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    addToast(wishlisted ? 'Removed from wishlist' : 'Added to wishlist', wishlisted ? 'info' : 'success');
  };

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className={`product-card anim${className ? ` ${className}` : ''}`} onClick={handleClick} role="button" tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && handleClick()}>
      
      {/* Image */}
      <div className="product-card__img-wrap">
        {product.isNew && <span className="product-card__badge-new">New</span>}
        {product.discount > 0 && (
          <span className="product-card__badge-discount">-{product.discount}%</span>
        )}
        <button
          className={`product-card__wishlist${wishlisted ? ' product-card__wishlist--active' : ''}`}
          onClick={handleWishlist}
          title={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <HeartIcon filled={wishlisted} />
        </button>
        {!imgError ? (
          <img
            src={product.image}
            alt={`${product.brand} ${product.name}`}
            className="product-card__img"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="product-card__img-fallback">
            <span className="product-card__img-brand">{product.brand}</span>
            <span className="product-card__img-model">{product.name}</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="product-card__body">
        <p className="product-card__brand">{product.brand}</p>
        <h3 className="product-card__name">{product.name}</h3>

        <div className="product-card__rating">
          <StarRating rating={product.rating} />
          <span className="product-card__reviews">({product.reviewCount?.toLocaleString('en-IN')})</span>
        </div>

        <div className="product-card__pricing">
          <span className="price-current">₹{product.price.toLocaleString('en-IN')}</span>
          {product.originalPrice > product.price && (
            <>
              <span className="price-original">₹{product.originalPrice.toLocaleString('en-IN')}</span>
              <span className="price-discount">{product.discount}% off</span>
            </>
          )}
        </div>

        <button
          className={`product-card__cart-btn${adding ? ' adding' : ''}`}
          onClick={handleAddToCart}
        >
          <CartIcon />
          {adding ? 'Added!' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
