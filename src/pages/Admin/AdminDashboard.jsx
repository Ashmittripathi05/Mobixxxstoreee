import AdminLayout from './AdminLayout';
import { getAdminStats, monthlyRevenue, orders } from '../../data/adminData';
import './AdminDashboard.css';
import './AdminLayout.css';

const TrendUpIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
  </svg>
);
const TruckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
);
const AlertIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

const StatCard = ({ label, value, sub, color = 'blue', icon, trend }) => (
  <div className={`stat-card stat-card--${color}`}>
    <div className="stat-card__header">
      <p className="stat-card__label">{label}</p>
      {icon && <span className="stat-card__icon">{icon}</span>}
    </div>
    <p className="stat-card__value">{value}</p>
    {sub && <p className="stat-card__sub">{sub}</p>}
    {trend && (
      <div className={`stat-card__trend stat-card__trend--${trend.dir}`}>
        {trend.dir === 'up' ? '↑' : '↓'} {trend.text}
      </div>
    )}
  </div>
);

// Pure SVG bar chart — no external libs
const RevenueChart = () => {
  const maxRev = Math.max(...monthlyRevenue.map(m => m.revenue));
  const BAR_W = 40;
  const GAP = 20;
  const H = 140;
  const totalW = monthlyRevenue.length * (BAR_W + GAP);

  return (
    <div className="rev-chart-wrap">
      <svg
        viewBox={`0 0 ${totalW} ${H + 36}`}
        width="100%"
        preserveAspectRatio="xMidYMax meet"
        className="rev-chart-svg"
      >
        {monthlyRevenue.map((m, i) => {
          const barH = maxRev > 0 ? Math.max(4, (m.revenue / maxRev) * H) : 4;
          const x = i * (BAR_W + GAP);
          const y = H - barH;
          return (
            <g key={m.label}>
              <rect x={x} y={0} width={BAR_W} height={H} rx="6" fill="rgba(255,255,255,0.03)" />
              <rect x={x} y={y} width={BAR_W} height={barH} rx="6" fill="url(#barGrad)" />
              <text x={x + BAR_W / 2} y={y - 6} textAnchor="middle" fontSize="9" fill="#A9B1C2">
                {m.revenue > 0 ? `₹${(m.revenue / 1000).toFixed(0)}K` : '—'}
              </text>
              <text x={x + BAR_W / 2} y={H + 20} textAnchor="middle" fontSize="10" fill="#6B7585">
                {m.label}
              </text>
            </g>
          );
        })}
        <defs>
          <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

const AdminDashboard = () => {
  const stats = getAdminStats();
  const recentOrders = orders.slice(0, 8);

  // Simulate a live GMV number
  const liveGMV = (stats.thisMonthRevenue + 1842500).toLocaleString('en-IN');

  return (
    <AdminLayout>
      {/* Page header */}
      <div className="admin-page-header">
        <div>
          <p className="admin-page-title">Dashboard</p>
          <p className="admin-page-sub">Welcome back, Owner. Here&apos;s your store overview.</p>
        </div>
        <div className="admin-live-indicator">
          <span className="admin-live-dot" />
          Live Data
        </div>
      </div>

      {/* Top telemetry bar */}
      <div className="admin-telemetry-bar">
        <div className="admin-telem-item">
          <div className="admin-telem-label"><TrendUpIcon /> Today&apos;s Live GMV</div>
          <div className="admin-telem-value admin-telem-value--green">₹{liveGMV}</div>
          <div className="admin-telem-sub">+14.2% vs yesterday pace</div>
        </div>
        <div className="admin-telem-divider" />
        <div className="admin-telem-item">
          <div className="admin-telem-label"><TruckIcon /> Active Dispatches</div>
          <div className="admin-telem-value">142</div>
          <div className="admin-telem-sub">Across 8 Regional Hubs</div>
        </div>
        <div className="admin-telem-divider" />
        <div className="admin-telem-item">
          <div className="admin-telem-label"><AlertIcon /> Inventory Watch</div>
          <div className="admin-telem-value admin-telem-value--red">
            {String(stats.outOfStockCount + stats.lowStockCount).padStart(2, '0')} SKUs
          </div>
          <div className="admin-telem-sub admin-telem-sub--red">Low Stock Warning</div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="stat-cards-grid">
        <StatCard
          label="Total Revenue"
          value={`₹${(stats.totalRevenue / 100000).toFixed(2)}L`}
          sub={`₹${stats.thisMonthRevenue.toLocaleString('en-IN')} this month`}
          color="blue"
          trend={{ dir: 'up', text: '18% vs last month' }}
        />
        <StatCard
          label="Total Orders"
          value={stats.totalOrders}
          sub={`${stats.thisMonthOrders} orders this month`}
          color="green"
          trend={{ dir: 'up', text: '12% this period' }}
        />
        <StatCard
          label="Avg. Order Value"
          value={`₹${stats.avgOrderValue.toLocaleString('en-IN')}`}
          sub="On delivered orders"
          color="purple"
        />
        <StatCard
          label="Stock Alerts"
          value={stats.lowStockCount + stats.outOfStockCount}
          sub={`${stats.outOfStockCount} out of stock · ${stats.lowStockCount} low`}
          color="red"
          trend={{ dir: 'down', text: 'Needs restocking' }}
        />
        <StatCard
          label="Delivered"
          value={stats.deliveredOrders}
          sub="Successfully fulfilled"
          color="green"
        />
        <StatCard
          label="Cancelled"
          value={stats.cancelledOrders}
          sub={`${((stats.cancelledOrders / stats.totalOrders) * 100).toFixed(1)}% cancellation rate`}
          color="red"
        />
      </div>

      {/* Revenue chart + top products */}
      <div className="dash-mid">
        <div className="admin-card dash-chart">
          <p className="admin-section-title">Monthly Revenue (last 6 months)</p>
          <RevenueChart />
          <div className="rev-chart-totals">
            {monthlyRevenue.map(m => (
              <div key={m.label} className="rev-chart-total-item">
                <span className="rev-chart-month">{m.label}</span>
                <span className="rev-chart-count">{m.count} orders</span>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-card dash-top-products">
          <p className="admin-section-title">Top Selling Products</p>
          <div className="top-products-list">
            {stats.topProducts.map((p, i) => (
              <div key={p.name} className="top-product-row">
                <span className="top-product-rank">#{i + 1}</span>
                <span className="top-product-name">{p.name}</span>
                <span className="top-product-units">{p.units} units</span>
              </div>
            ))}
          </div>

          <p className="admin-section-title" style={{ marginTop: '24px' }}>Revenue by Brand</p>
          <div className="brand-revenue-list">
            {stats.topBrands.map(b => {
              const maxRev = stats.topBrands[0]?.revenue || 1;
              const pct = Math.round((b.revenue / maxRev) * 100);
              return (
                <div key={b.brand} className="brand-rev-row">
                  <span className="brand-rev-name">{b.brand}</span>
                  <div className="brand-rev-bar-wrap">
                    <div className="brand-rev-bar" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="brand-rev-val">₹{(b.revenue / 1000).toFixed(0)}K</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent orders */}
      <div className="admin-card" style={{ marginTop: '20px' }}>
        <div className="admin-card-header">
          <p className="admin-section-title" style={{ marginBottom: 0 }}>Recent Orders</p>
          <a href="/admin/orders" className="admin-card-link">View all →</a>
        </div>
        <div className="admin-table-wrap" style={{ marginTop: '14px' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(o => (
                <tr key={o.id}>
                  <td className="bold">{o.id}</td>
                  <td>{o.customerName} <span style={{ color: 'var(--text-3)', fontSize: '12px' }}>· {o.city}</span></td>
                  <td>{o.product}</td>
                  <td className="bold">₹{o.total.toLocaleString('en-IN')}</td>
                  <td>
                    <span className={`status-badge status-badge--${o.status.toLowerCase().replace(' ', '-')}`}>
                      {o.status}
                    </span>
                  </td>
                  <td>{o.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
