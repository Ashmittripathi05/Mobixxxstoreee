import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Navbar.css';

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const CartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 01-8 0"/>
  </svg>
);

const HeartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
  </svg>
);

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);

const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/mobiles', label: 'Mobiles' },
  { to: '/accessories', label: 'Accessories' },
  { to: '/offers', label: 'Offers' },
  { to: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const { cartCount } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/mobiles?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
        <div className="container navbar__inner">

          {/* Logo */}
          <Link to="/" className="navbar__logo">
            <span className="navbar__logo-mark">M</span>
            <span className="navbar__logo-text">MOBIX</span>
          </Link>

          {/* Desktop nav links */}
          <ul className="navbar__links">
            {navLinks.map(link => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`navbar__link${isActive(link.to) ? ' navbar__link--active' : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right actions */}
          <div className="navbar__actions">
            {/* Search */}
            <form className={`navbar__search${searchFocused ? ' navbar__search--focused' : ''}`} onSubmit={handleSearch}>
              <span className="navbar__search-icon"><SearchIcon /></span>
              <input
                ref={searchRef}
                type="text"
                placeholder="Search phones..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="navbar__search-input"
                id="navbar-search"
              />
            </form>

            {/* Icon buttons */}
            <Link to="/wishlist" className="navbar__icon-btn" title="Wishlist">
              <HeartIcon />
            </Link>

            <Link to="/cart" className="navbar__icon-btn navbar__cart-btn" title="Cart">
              <CartIcon />
              {cartCount > 0 && <span className="navbar__cart-badge">{cartCount > 9 ? '9+' : cartCount}</span>}
            </Link>

            <button className="navbar__icon-btn" title="Account">
              <UserIcon />
            </button>

            {/* Hamburger */}
            <button
              className="navbar__hamburger"
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && <div className="mobile-overlay" onClick={() => setMenuOpen(false)} />}

      <div className={`mobile-menu${menuOpen ? ' mobile-menu--open' : ''}`}>
        <form className="mobile-menu__search" onSubmit={handleSearch}>
          <span><SearchIcon /></span>
          <input
            type="text"
            placeholder="Search phones..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </form>
        <ul className="mobile-menu__links">
          {navLinks.map(link => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`mobile-menu__link${isActive(link.to) ? ' mobile-menu__link--active' : ''}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mobile-menu__bottom">
          <Link to="/cart" className="btn btn-primary btn-full" onClick={() => setMenuOpen(false)}>
            <CartIcon /> Cart {cartCount > 0 && `(${cartCount})`}
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
