import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import './AdminLogin.css';

const LockIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0110 0v4"/>
  </svg>
);

const AdminLogin = () => {
  const { login } = useAdmin();
  const navigate = useNavigate();
  const [form, setForm] = useState({ id: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      const ok = login(form.id, form.password);
      setLoading(false);
      if (ok) {
        navigate('/admin');
      } else {
        setError('Invalid owner ID or password. Please try again.');
      }
    }, 600);
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        {/* Logo */}
        <div className="admin-login-logo">
          <div className="admin-logo-mark">M</div>
          <span className="admin-logo-text">MOBIX</span>
        </div>

        <div className="admin-login-icon">
          <LockIcon />
        </div>

        <h1 className="admin-login-title">Owner Login</h1>
        <p className="admin-login-sub">Sign in to access the store management panel</p>

        <form className="admin-login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="admin-id">Owner ID</label>
            <input
              id="admin-id"
              type="text"
              className="form-input"
              placeholder="Enter your owner ID"
              value={form.id}
              onChange={e => setForm(p => ({ ...p, id: e.target.value }))}
              autoComplete="username"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="admin-pass">Password</label>
            <div className="admin-pass-wrap">
              <input
                id="admin-pass"
                type={showPass ? 'text' : 'password'}
                className="form-input"
                placeholder="Enter your password"
                value={form.password}
                onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="admin-pass-toggle"
                onClick={() => setShowPass(v => !v)}
                tabIndex={-1}
              >
                {showPass ? '🙈' : '👁'}
              </button>
            </div>
          </div>

          {error && <div className="admin-login-error">{error}</div>}

          <button
            type="submit"
            className={`btn btn-primary btn-full btn-lg admin-login-btn${loading ? ' loading' : ''}`}
            disabled={loading}
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <div className="admin-login-hint">
          <span>Demo credentials — ID: <code>owner</code> · Password: <code>mobix@2025</code></span>
        </div>

        <a href="/" className="admin-login-back">← Back to store</a>
      </div>
    </div>
  );
};

export default AdminLogin;
