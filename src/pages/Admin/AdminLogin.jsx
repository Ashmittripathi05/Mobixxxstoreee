import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { getAdminStats } from '../../data/adminData';
import './AdminLogin.css';

/* ─── Icon helpers ─────────────────────────────── */
const ShieldIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);
const EyeOffIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);
const UserBadgeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const KeyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
  </svg>
);
const TrendUpIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
  </svg>
);
const TruckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
);
const AlertTriangle = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);
const LockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
  </svg>
);
const CheckShieldIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>
  </svg>
);
const GlobeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
  </svg>
);
const PosIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
);
const StoreIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const ServerIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>
  </svg>
);
const PhoneIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 012 1.18 2 2 0 014 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/>
  </svg>
);

/* ─── Static TOTP display (visual only) ────────── */
const TOTP_DIGITS = [8, 4, 1, 9, 0, 2];

const AdminLogin = () => {
  const { login } = useAdmin();
  const navigate = useNavigate();
  const [loginMode, setLoginMode] = useState('owner'); // 'owner' | 'fido2'
  const [form, setForm] = useState({ id: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [rememberWs, setRememberWs] = useState(true);
  const [hwKey, setHwKey] = useState(false);

  const stats = getAdminStats();
  const gmv = (stats.thisMonthRevenue + 1842500).toLocaleString('en-IN');

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
        setError('Invalid Owner ID or Master Password. Unauthorised access is logged.');
      }
    }, 800);
  };

  return (
    <div className="aml-page">
      {/* ── Left panel ─────────────────────────── */}
      <div className="aml-left">
        {/* Branding header */}
        <div className="aml-brand">
          <div className="aml-brand__logo">
            <div className="aml-brand__mark">M</div>
            <div>
              <span className="aml-brand__name">MOBIX</span>
              <span className="aml-brand__sub">Command &amp; Operations HQ</span>
            </div>
          </div>
          <span className="aml-brand__badge">
            <span className="aml-badge-dot" /> OWNER / HQ ADMIN
          </span>
        </div>

        {/* Portal label */}
        <div className="aml-portal-label">
          <span className="aml-portal-tag">RESTRICTED STORE MANAGEMENT PORTAL</span>
          <h1 className="aml-portal-title">Executive Telemetry &amp; Store Governance</h1>
        </div>

        {/* Telemetry stat cards */}
        <div className="aml-stats-row">
          <div className="aml-stat-card">
            <div className="aml-stat-label">
              <TrendUpIcon /> Today&apos;s Live GMV
            </div>
            <div className="aml-stat-value aml-stat-value--green">₹{gmv}</div>
            <div className="aml-stat-change">+14.2% vs yesterday pace</div>
          </div>
          <div className="aml-stat-card">
            <div className="aml-stat-label">
              <TruckIcon /> Active Dispatches
            </div>
            <div className="aml-stat-value">142</div>
            <div className="aml-stat-meta">Across 8 Regional Hubs</div>
          </div>
          <div className="aml-stat-card">
            <div className="aml-stat-label">
              <AlertTriangle /> Inventory Watch
            </div>
            <div className="aml-stat-value aml-stat-value--red">
              {String(stats.outOfStockCount + stats.lowStockCount).padStart(2, '0')} SKUs
            </div>
            <div className="aml-stat-meta aml-stat-meta--red">Low Stock Warning</div>
          </div>
        </div>

        {/* Security badge strip */}
        <div className="aml-security-strip">
          <div className="aml-security-badge">
            <LockIcon />
            <div>
              <span className="aml-sec-title">256-Bit TLS Vault</span>
              <span className="aml-sec-sub">Zero-knowledge layer</span>
            </div>
          </div>
          <div className="aml-security-badge">
            <CheckShieldIcon />
            <div>
              <span className="aml-sec-title">SOC-2 Type II</span>
              <span className="aml-sec-sub">Hardware key audited</span>
            </div>
          </div>
          <div className="aml-security-badge">
            <GlobeIcon />
            <div>
              <span className="aml-sec-title">IP Anomaly AI</span>
              <span className="aml-sec-sub">Geo-fenced telemetry</span>
            </div>
          </div>
        </div>

        {/* Status bar */}
        <div className="aml-status-bar">
          <div className="aml-status-item">
            <span className="aml-status-dot aml-status-dot--green" />
            <ServerIcon />
            <span>Core POS, Gateways &amp; Inventory APIs: <strong className="aml-status-op">Operational (18ms)</strong></span>
          </div>
          <div className="aml-status-item">
            <PhoneIcon />
            <span>Priority Desk: <strong>1800-MOBIX-HQ</strong></span>
          </div>
        </div>
      </div>

      {/* ── Right panel ────────────────────────── */}
      <div className="aml-right">
        <div className="aml-form-card">
          {/* Card header */}
          <div className="aml-form-header">
            <span className="aml-form-icon"><ShieldIcon /></span>
            <div>
              <h2 className="aml-form-title">Merchant Sign In</h2>
              <p className="aml-form-subtitle">Store control, revenue analytics &amp; privilege tier clearance.</p>
            </div>
          </div>

          {/* Mode tabs */}
          <div className="aml-mode-tabs">
            <button
              className={`aml-mode-tab${loginMode === 'owner' ? ' aml-mode-tab--active' : ''}`}
              onClick={() => setLoginMode('owner')}
            >
              <UserBadgeIcon /> Owner / Master ID
            </button>
            <button
              className={`aml-mode-tab${loginMode === 'fido2' ? ' aml-mode-tab--active' : ''}`}
              onClick={() => setLoginMode('fido2')}
            >
              <KeyIcon /> Security Key / FIDO2
            </button>
          </div>

          {loginMode === 'fido2' ? (
            <div className="aml-fido-notice">
              <KeyIcon />
              <div>
                <p className="aml-fido-title">Hardware Security Key</p>
                <p className="aml-fido-desc">Insert your YubiKey or NFC hardware token and tap to authenticate. FIDO2 passkeys are supported on this workstation.</p>
                <button className="aml-fido-btn">Activate Hardware Key →</button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="aml-form">
              {/* Merchant ID */}
              <div className="aml-field">
                <div className="aml-field-top">
                  <label className="aml-field-label" htmlFor="aml-id">
                    MERCHANT ID / ADMIN EMAIL
                  </label>
                  <span className="aml-field-hint">Format: MBX-XXXX-01</span>
                </div>
                <div className="aml-input-wrap">
                  <span className="aml-input-icon"><UserBadgeIcon /></span>
                  <input
                    id="aml-id"
                    type="text"
                    className="aml-input"
                    placeholder="admin-core@mobix.in"
                    value={form.id}
                    onChange={e => setForm(p => ({ ...p, id: e.target.value }))}
                    autoComplete="username"
                    required
                  />
                </div>
              </div>

              {/* Master Password */}
              <div className="aml-field">
                <div className="aml-field-top">
                  <label className="aml-field-label" htmlFor="aml-pass">
                    MASTER PASSWORD
                  </label>
                  <button type="button" className="aml-forgot">Forgot Password?</button>
                </div>
                <div className="aml-input-wrap">
                  <span className="aml-input-icon"><LockIcon /></span>
                  <input
                    id="aml-pass"
                    type={showPass ? 'text' : 'password'}
                    className="aml-input"
                    placeholder="••••••••••••••"
                    value={form.password}
                    onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    className="aml-eye-btn"
                    onClick={() => setShowPass(v => !v)}
                    tabIndex={-1}
                  >
                    {showPass ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </div>

              {/* TOTP */}
              <div className="aml-field">
                <div className="aml-field-top">
                  <label className="aml-field-label">TWO-FACTOR PASSCODE (TOTP)</label>
                  <span className="aml-totp-app-link">↗ Authenticator App</span>
                </div>
                <div className="aml-totp-row">
                  {TOTP_DIGITS.map((d, i) => (
                    <div key={i} className="aml-totp-digit">{d}</div>
                  ))}
                </div>
              </div>

              {/* Options */}
              <div className="aml-options">
                <label className="aml-checkbox-label">
                  <input
                    type="checkbox"
                    checked={rememberWs}
                    onChange={e => setRememberWs(e.target.checked)}
                    className="aml-checkbox"
                  />
                  <span>Remember this trusted workstation for 30 days</span>
                </label>
                <label className="aml-checkbox-label">
                  <input
                    type="checkbox"
                    checked={hwKey}
                    onChange={e => setHwKey(e.target.checked)}
                    className="aml-checkbox"
                  />
                  <span>Prompt for physical hardware key (YubiKey / NFC)</span>
                </label>
              </div>

              {error && <div className="aml-error">{error}</div>}

              {/* Demo hint */}
              <div className="aml-demo-hint">
                Demo — ID: <code>owner</code> · Password: <code>mobix@2025</code>
              </div>

              <button
                type="submit"
                className={`aml-submit${loading ? ' aml-submit--loading' : ''}`}
                disabled={loading}
              >
                {loading ? 'Authenticating…' : 'Authenticate & Enter Store Console →'}
              </button>
            </form>
          )}

          {/* Footer links */}
          <div className="aml-alt-links">
            <a href="/admin/login" className="aml-alt-link" onClick={e => { e.preventDefault(); setLoginMode('fido2'); }}>
              <PosIcon />
              <span>Switch to Floor Staff &amp; POS terminal login</span>
              <span className="aml-alt-arrow">›</span>
            </a>
            <a href="/" className="aml-alt-link">
              <StoreIcon />
              <span>Back to Customer Storefront (mobix.in)</span>
              <span className="aml-alt-arrow">›</span>
            </a>
          </div>

          <p className="aml-legal">
            Strictly Private Store Network. Unauthorized access attempts are actively logged, geo-traced, and reported. MOBIX Technologies Private Limited.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
