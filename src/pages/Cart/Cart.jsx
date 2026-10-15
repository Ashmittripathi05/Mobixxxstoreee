import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import './Cart.css';

const TrashIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
  </svg>
);

const Cart = () => {
  const { items, removeFromCart, updateQuantity, cartSubtotal, cartDiscount, deliveryCharge, cartTotal } = useCart();
  const { addToast } = useToast();

  const handleRemove = (item) => {
    removeFromCart(item.id, item.selectedStorage, item.selectedRam);
    addToast(`${item.name} removed from cart`, 'info');
  };

  if (items.length === 0) {
    return (
      <div className="page-wrapper">
        <div className="container cart-empty">
          <span className="cart-empty__icon">🛒</span>
          <h2>Your cart is empty</h2>
          <p>Add products from our store to see them here.</p>
          <Link to="/mobiles" className="btn btn-primary">Browse Mobiles</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="container cart-page">
        <h1 className="cart-page__title">Shopping Cart <span className="cart-page__count">({items.length} {items.length === 1 ? 'item' : 'items'})</span></h1>

        <div className="cart-layout">
          {/* Items */}
          <div className="cart-items">
            {items.map((item, idx) => (
              <div key={`${item.id}-${item.selectedStorage}-${item.selectedRam}`} className="cart-item">
                <div className="cart-item__img">
                  <img
                    src={item.image}
                    alt={item.name}
                    onError={e => { e.target.style.display = 'none'; }}
                  />
                </div>
                <div className="cart-item__info">
                  <p className="cart-item__brand">{item.brand}</p>
                  <h3 className="cart-item__name">{item.name}</h3>
                  <div className="cart-item__variants">
                    {item.selectedStorage && <span>{item.selectedStorage}</span>}
                    {item.selectedRam && <span>{item.selectedRam} RAM</span>}
                  </div>
                  <div className="cart-item__actions">
                    <div className="cart-qty">
                      <button
                        className="cart-qty__btn"
                        onClick={() => updateQuantity(item.id, item.selectedStorage, item.selectedRam, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >−</button>
                      <span className="cart-qty__value">{item.quantity}</span>
                      <button
                        className="cart-qty__btn"
                        onClick={() => updateQuantity(item.id, item.selectedStorage, item.selectedRam, item.quantity + 1)}
                      >+</button>
                    </div>
                    <button className="cart-item__remove" onClick={() => handleRemove(item)}>
                      <TrashIcon /> Remove
                    </button>
                  </div>
                </div>
                <div className="cart-item__price">
                  <span className="cart-item__total">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                  {item.quantity > 1 && (
                    <span className="cart-item__unit">₹{item.price.toLocaleString('en-IN')} each</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="cart-summary">
            <h3 className="cart-summary__title">Order Summary</h3>
            <div className="cart-summary__rows">
              <div className="cart-summary__row">
                <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>
              {cartDiscount > 0 && (
                <div className="cart-summary__row cart-summary__row--discount">
                  <span>Discount</span>
                  <span>− ₹{cartDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="cart-summary__row">
                <span>Delivery</span>
                <span className={deliveryCharge === 0 ? 'cart-summary__free' : ''}>
                  {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                </span>
              </div>
            </div>
            <hr className="divider" />
            <div className="cart-summary__total">
              <span>Total</span>
              <span>₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>
            {cartDiscount > 0 && (
              <p className="cart-summary__saved">You save ₹{cartDiscount.toLocaleString('en-IN')} on this order</p>
            )}
            <Link to="/checkout" className="btn btn-primary btn-full btn-lg">
              Proceed to Checkout →
            </Link>
            <Link to="/mobiles" className="btn btn-ghost btn-full btn-sm cart-summary__continue">
              ← Continue Shopping
            </Link>
            <div className="cart-summary__note">
              * All prices are inclusive of GST. Free delivery on orders above ₹499.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
