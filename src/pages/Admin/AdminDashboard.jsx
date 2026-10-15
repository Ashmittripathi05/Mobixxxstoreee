import AdminLayout from './AdminLayout';
import { getAdminStats, monthlyRevenue, orders } from '../../data/adminData';
import './AdminDashboard.css';
import './AdminLayout.css';

const StatCard = ({ label, value, sub, color = 'blue' }) => (
  <div className={`stat-card stat-card--${color}`}>
    <p className="stat-card__label">{label}</p>
    <p className="stat-card__value">{value}</p>
    {sub && <p className="stat-card__sub">{sub}</p>}
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
              {/* Background track */}
              <rect x={x} y={0} width={BAR_W} height={H} rx="6" fill="rgba(255,255,255,0.04)" />
              {/* Bar */}
              <rect x={x} y={y} width={BAR_W} height={barH} rx="6" fill="url(#barGrad)" />
              {/* Value label */}
              <text x={x + BAR_W / 2} y={y - 6} textAnchor="middle" fontSize="9" fill="#A9B1C2">
                {m.revenue > 0 ? `₹${(m.revenue / 1000).toFixed(0)}K` : '—'}
              </text>
              {/* Month label */}
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

  return (
    <AdminLayout>
      <p className="admin-page-title">Dashboard</p>
      <p className="admin-page-sub">Welcome back, Owner. Here's your store overview.</p>

      {/* Stat cards */}
      <div className="stat-cards-grid">
        <StatCard
          label="Total Revenue"
          value={`₹${(stats.totalRevenue / 100000).toFixed(2)}L`}
          sub={`₹${stats.thisMonthRevenue.toLocaleString('en-IN')} this month`}
          color="blue"
        />
        <StatCard
          label="Total Orders"
          value={stats.totalOrders}
          sub={`${stats.thisMonthOrders} orders this month`}
          color="green"
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
