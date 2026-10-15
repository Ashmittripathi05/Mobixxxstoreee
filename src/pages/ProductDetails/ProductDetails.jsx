import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import { getProductById, products } from '../../data/products';
import ProductCard from '../../components/ProductCard/ProductCard';
import './ProductDetails.css';

const StarRating = ({ rating }) => (
  <div className="stars pd-stars">
    {[1,2,3,4,5].map(i => (
      <span key={i} className={`star${i > Math.floor(rating) ? ' star-empty' : ''}`}>★</span>
    ))}
  </div>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const HeartIcon = ({ filled }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
  </svg>
);

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id);
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { addToast } = useToast();

  const [selectedStorage, setSelectedStorage] = useState(product?.storageOptions?.[0]);
  const [selectedRam, setSelectedRam] = useState(product?.ramOptions?.[0]);
  const [activeImg, setActiveImg] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [imgError, setImgError] = useState(false);

  if (!product) {
    return (
      <div className="page-wrapper">
        <div className="container pd-not-found">
          <h2>Product not found</h2>
          <Link to="/mobiles" className="btn btn-primary btn-sm">Back to Shop</Link>
        </div>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);
  const imgs = product.images?.length > 0 ? product.images : [product.image];
  const relatedProducts = products.filter(p => p.brand === product.brand && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, selectedStorage, selectedRam);
    addToast(`${product.name} added to cart`);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedStorage, selectedRam);
    navigate('/cart');
  };

  const handleWishlist = () => {
    toggleWishlist(product.id);
    addToast(wishlisted ? 'Removed from wishlist' : 'Added to wishlist', wishlisted ? 'info' : 'success');
  };

  return (
    <div className="page-wrapper">
      <div className="container pd-page">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Home</Link> <span>/</span>
          <Link to="/mobiles">Mobiles</Link> <span>/</span>
          <span>{product.brand}</span> <span>/</span>
          <span>{product.name}</span>
        </nav>

        {/* Main section */}
        <div className="pd-main">
          {/* Images */}
          <div className="pd-images">
            <div className="pd-img-thumbs">
              {imgs.map((img, i) => (
                <button
                  key={i}
                  className={`pd-thumb${activeImg === i ? ' pd-thumb--active' : ''}`}
                  onClick={() => setActiveImg(i)}
                >
                  <img src={img} alt={`${product.name} view ${i + 1}`} onError={() => {}} />
                </button>
              ))}
            </div>
            <div className="pd-img-main">
              {!imgError ? (
                <img
                  src={imgs[activeImg]}
                  alt={`${product.brand} ${product.name}`}
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="pd-img-fallback">
                  <p className="pd-img-fallback__brand">{product.brand}</p>
                  <p className="pd-img-fallback__name">{product.name}</p>
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="pd-info">
            <div className="pd-info__top">
              <span className="pd-brand">{product.brand}</span>
              {product.isNew && <span className="badge badge-new">New</span>}
            </div>

            <h1 className="pd-name">{product.name}</h1>

            <div className="pd-rating-row">
              <StarRating rating={product.rating} />
              <span className="pd-rating-score">{product.rating}</span>
              <span className="pd-review-count">({product.reviewCount?.toLocaleString('en-IN')} reviews)</span>
            </div>

            <div className="pd-pricing">
              <span className="pd-price-current">₹{product.price.toLocaleString('en-IN')}</span>
              {product.originalPrice > product.price && (
                <>
                  <span className="price-original">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                  <span className="badge badge-offer">{product.discount}% OFF</span>
                </>
              )}
            </div>

            <p className="pd-savings">
              You save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')} on this purchase
            </p>

            <hr className="divider" />

            {/* Storage */}
            {product.storageOptions && (
              <div className="pd-option-group">
                <span className="pd-option-label">Storage: <strong>{selectedStorage}</strong></span>
                <div className="pd-option-chips">
                  {product.storageOptions.map(s => (
                    <button
                      key={s}
                      className={`pd-option-chip${selectedStorage === s ? ' pd-option-chip--active' : ''}`}
                      onClick={() => setSelectedStorage(s)}
                    >{s}</button>
                  ))}
                </div>
              </div>
            )}

            {/* RAM */}
            {product.ramOptions && product.ramOptions.length > 1 && (
              <div className="pd-option-group">
                <span className="pd-option-label">RAM: <strong>{selectedRam}</strong></span>
                <div className="pd-option-chips">
                  {product.ramOptions.map(r => (
                    <button
                      key={r}
                      className={`pd-option-chip${selectedRam === r ? ' pd-option-chip--active' : ''}`}
                      onClick={() => setSelectedRam(r)}
                    >{r}</button>
                  ))}
                </div>
              </div>
            )}

            {/* Colors */}
            {product.colors && (
              <div className="pd-option-group">
                <span className="pd-option-label">Color: <strong>{product.colors[0]}</strong></span>
                <div className="pd-colors">
                  {product.colors.map(c => (
                    <span key={c} className="pd-color-pill">{c}</span>
                  ))}
                </div>
              </div>
            )}

            <hr className="divider" />

            {/* CTA buttons */}
            <div className="pd-ctas">
              <button className="btn btn-primary btn-lg" style={{ flex: 1 }} onClick={handleAddToCart}>
                Add to Cart
              </button>
              <button className="btn btn-navy btn-lg" style={{ flex: 1 }} onClick={handleBuyNow}>
                Buy Now
              </button>
              <button
                className={`btn btn-outline pd-wishlist-btn${wishlisted ? ' pd-wishlist-btn--active' : ''}`}
                onClick={handleWishlist}
                title="Add to wishlist"
              >
                <HeartIcon filled={wishlisted} />
              </button>
            </div>

            {/* Trust indicators */}
            <div className="pd-trust">
              {['Genuine Product', 'Manufacturer Warranty', 'Secure Payment', 'Easy Exchange'].map(item => (
                <div key={item} className="pd-trust-item">
                  <span className="pd-trust-icon"><CheckIcon /></span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pd-delivery">
              <strong>Delivery:</strong> {product.delivery}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="pd-tabs">
          <div className="pd-tabs__nav">
            {['description', 'specifications', 'inbox', 'reviews'].map(tab => (
              <button
                key={tab}
                className={`pd-tab-btn${activeTab === tab ? ' pd-tab-btn--active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1).replace('inbox', "What's in the Box")}
              </button>
            ))}
          </div>

          <div className="pd-tab-content">
            {activeTab === 'description' && (
              <p className="pd-description">{product.description}</p>
            )}
            {activeTab === 'specifications' && (
              <table className="pd-specs-table">
                <tbody>
                  {Object.entries(product.specs || {}).map(([key, val]) => (
                    <tr key={key}>
                      <td className="pd-specs-key">{key}</td>
                      <td className="pd-specs-val">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {activeTab === 'inbox' && (
              <ul className="pd-inbox-list">
                {product.inBox?.map((item, i) => (
                  <li key={i}><CheckIcon /> {item}</li>
                ))}
              </ul>
            )}
            {activeTab === 'reviews' && (
              <div className="pd-reviews-note">
                <p>Reviews for this product are from verified purchasers. Showing aggregated demo data.</p>
                <div className="pd-reviews-list">
                  <div className="pd-review">
                    <div className="pd-review__stars"><StarRating rating={5} /></div>
                    <p className="pd-review__text">"Excellent device, fully genuine and delivered on time."</p>
                    <span className="pd-review__author">— Rahul S., Mumbai</span>
                  </div>
                  <div className="pd-review">
                    <div className="pd-review__stars"><StarRating rating={4} /></div>
                    <p className="pd-review__text">"Good product for the price. MOBIX delivered as promised."</p>
                    <span className="pd-review__author">— Priya M., Bengaluru</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related */}
        {relatedProducts.length > 0 && (
          <div className="pd-related">
            <h2 className="section-heading">More from {product.brand}</h2>
            <div className="pd-related-grid">
              {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
