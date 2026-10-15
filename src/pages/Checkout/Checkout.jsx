import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import './Checkout.css';

const Checkout = () => {
  const { items, cartSubtotal, cartDiscount, deliveryCharge, cartTotal, clearCart } = useCart();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    house: '', street: '', city: '', state: '', pincode: '',
    payment: 'upi',
  });
  const [submitted, setSubmitted] = useState(false);

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
    'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan',
    'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Delhi', 'Jammu & Kashmir', 'Ladakh', 'Chandigarh', 'Puducherry',
  ];

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate required fields
    const required = ['name', 'phone', 'email', 'house', 'city', 'state', 'pincode'];
    for (const field of required) {
      if (!form[field].trim()) {
        addToast(`Please fill in all required fields`, 'error');
        return;
      }
    }
    setSubmitted(true);
    clearCart();
  };

  if (submitted) {
    return (
      <div className="page-wrapper">
        <div className="container checkout-success">
          <div className="checkout-success__icon">✓</div>
          <h2>Order Placed Successfully!</h2>
          <p>Thank you for shopping with MOBIX. Your order has been received and will be processed shortly.</p>
          <p className="checkout-success__note">
            This is a demo order. No real payment has been processed.
          </p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>Continue Shopping</button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="page-wrapper">
      <div className="container checkout-page">
        <h1 className="checkout-page__title">Checkout</h1>

        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={handleSubmit}>
            {/* Customer info */}
            <div className="checkout-section">
              <h2 className="checkout-section__title">Customer Information</h2>
              <div className="checkout-form__grid">
                <div className="form-group">
                  <label className="form-label" htmlFor="co-name">Full Name *</label>
                  <input id="co-name" type="text" name="name" className="form-input" placeholder="Your full name" value={form.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="co-phone">Mobile Number *</label>
                  <input id="co-phone" type="tel" name="phone" className="form-input" placeholder="10-digit mobile number" value={form.phone} onChange={handleChange} required maxLength={10} />
                </div>
                <div className="form-group checkout-form__grid--full">
                  <label className="form-label" htmlFor="co-email">Email Address *</label>
                  <input id="co-email" type="email" name="email" className="form-input" placeholder="email@example.com" value={form.email} onChange={handleChange} required />
                </div>
              </div>
            </div>

            {/* Delivery address */}
            <div className="checkout-section">
              <h2 className="checkout-section__title">Delivery Address</h2>
              <div className="checkout-form__grid">
                <div className="form-group checkout-form__grid--full">
                  <label className="form-label" htmlFor="co-house">House / Flat / Building *</label>
                  <input id="co-house" type="text" name="house" className="form-input" placeholder="Flat no., Building, Society" value={form.house} onChange={handleChange} required />
                </div>
                <div className="form-group checkout-form__grid--full">
                  <label className="form-label" htmlFor="co-street">Street / Area / Landmark</label>
                  <input id="co-street" type="text" name="street" className="form-input" placeholder="Street, Area, Near landmark" value={form.street} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="co-city">City *</label>
                  <input id="co-city" type="text" name="city" className="form-input" placeholder="City" value={form.city} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="co-state">State *</label>
                  <select id="co-state" name="state" className="form-select" value={form.state} onChange={handleChange} required>
                    <option value="">Select state</option>
                    {indianStates.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="co-pin">PIN Code *</label>
                  <input id="co-pin" type="text" name="pincode" className="form-input" placeholder="6-digit PIN" value={form.pincode} onChange={handleChange} maxLength={6} required />
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="checkout-section">
              <h2 className="checkout-section__title">Payment Method</h2>
              <p className="checkout-section__note">
                ⚠ This is a demo website. No real payments are processed.
              </p>
              <div className="payment-options">
                {[
                  { id: 'upi', label: 'UPI (GPay, PhonePe, Paytm)', icon: '📱' },
                  { id: 'card', label: 'Credit / Debit Card', icon: '💳' },
                  { id: 'cod', label: 'Cash on Delivery', icon: '💵' },
                ].map(opt => (
                  <label key={opt.id} className={`payment-option${form.payment === opt.id ? ' payment-option--active' : ''}`}>
                    <input
                      type="radio"
                      name="payment"
                      value={opt.id}
                      checked={form.payment === opt.id}
                      onChange={handleChange}
                    />
                    <span className="payment-option__icon">{opt.icon}</span>
                    <span className="payment-option__label">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-lg btn-full">
              Place Order — ₹{cartTotal.toLocaleString('en-IN')}
            </button>
          </form>

          {/* Order summary */}
          <div className="checkout-summary">
            <h3 className="checkout-summary__title">Your Order</h3>
            <div className="checkout-summary__items">
              {items.map(item => (
                <div key={`${item.id}-${item.selectedStorage}`} className="checkout-summary__item">
                  <img src={item.image} alt={item.name} onError={e => { e.target.style.display = 'none'; }} />
                  <div className="checkout-summary__item-info">
                    <span className="checkout-summary__item-name">{item.name}</span>
                    <span className="checkout-summary__item-variant">{item.selectedStorage} · Qty {item.quantity}</span>
                  </div>
                  <span className="checkout-summary__item-price">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
            <hr className="divider" />
            <div className="checkout-summary__rows">
              <div className="checkout-summary__row">
                <span>Subtotal</span>
                <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>
              {cartDiscount > 0 && (
                <div className="checkout-summary__row checkout-summary__row--discount">
                  <span>Discount</span>
                  <span>− ₹{cartDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="checkout-summary__row">
                <span>Delivery</span>
                <span style={{ color: deliveryCharge === 0 ? 'var(--success)' : '' }}>
                  {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                </span>
              </div>
            </div>
            <hr className="divider" />
            <div className="checkout-summary__total">
              <span>Total</span>
              <span>₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
