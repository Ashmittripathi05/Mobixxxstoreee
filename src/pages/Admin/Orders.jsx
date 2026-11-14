import AdminLayout from './AdminLayout';
import { orders } from '../../data/adminData';
import './Orders.css';

/* ─── Icons ─────────────────────────────────────────────────────────────── */
const SearchIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

import { useState, useMemo } from 'react';

const statusColors = {
  Delivered:  { bg: '#DCFCE7', color: '#166534' },
  Processing: { bg: '#DBEAFE', color: '#1D4ED8' },
  Shipped:    { bg: '#FEF3C7', color: '#92400E' },
  Cancelled:  { bg: '#FEE2E2', color: '#991B1B' },
};

const OrdersPage = () => {
  const [search,  setSearch]  = useState('');
  const [status,  setStatus]  = useState('All');
  const [sortBy,  setSortBy]  = useState('date'); // date | amount

  const statuses = ['All', 'Delivered', 'Processing', 'Shipped', 'Cancelled'];

  const counts = useMemo(() => {
    const c = { All: orders.length };
    statuses.slice(1).forEach(s => { c[s] = orders.filter(o => o.status === s).length; });
    return c;
  }, []);

  const visible = useMemo(() => {
    let list = [...orders];
    if (status !== 'All') list = list.filter(o => o.status === status);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(o =>
        o.id.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.product.toLowerCase().includes(q) ||
        o.city.toLowerCase().includes(q)
      );
    }
    if (sortBy === 'amount') list.sort((a, b) => b.total - a.total);
    return list;
  }, [search, status, sortBy]);

  const totalRevenue = visible.reduce((s, o) => s + (o.status !== 'Cancelled' ? o.total : 0), 0);

  return (
    <AdminLayout>
      <div className="admin-page-header">
        <div>
          <p className="admin-page-title">Orders</p>
          <p className="admin-page-sub">
            View all customer orders, filter by status, and track revenue.
          </p>
        </div>
        <div className="ord-header-stat">
          <span className="ord-header-label">Filtered Revenue</span>
          <span className="ord-header-val">₹{totalRevenue.toLocaleString('en-IN')}</span>
        </div>
      </div>

      {/* Status filter chips */}
      <div className="inv-filter-tabs" style={{ marginBottom: 14 }}>
        {statuses.map(s => (
          <button
            key={s}
            className={`inv-filter-tab${status === s ? ' inv-filter-tab--active' : ''}`}
            onClick={() => setStatus(s)}
          >
            {s} ({counts[s] ?? 0})
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="inv-toolbar">
        <div className="inv-search-wrap">
          <SearchIcon />
          <input
            className="inv-search"
            placeholder="Search by order ID, customer, product, city…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select
          className="ord-sort-select"
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
        >
          <option value="date">Sort: Newest first</option>
          <option value="amount">Sort: Highest amount</option>
        </select>
      </div>

      {/* Table */}
      <div className="admin-card inv-table-card">
        <div className="inv-table-wrap">
          <table className="inv-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>City</th>
                <th>Product</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {visible.length === 0 ? (
                <tr><td colSpan={7} className="inv-empty">No orders match your filter.</td></tr>
              ) : visible.map(o => {
                const sc = statusColors[o.status] ?? { bg: '#F1F5F9', color: '#475569' };
                return (
                  <tr key={o.id}>
                    <td><span className="ord-id">{o.id}</span></td>
                    <td className="ord-customer">{o.customerName}</td>
                    <td><span className="ord-city">{o.city}</span></td>
                    <td className="ord-product">{o.product}</td>
                    <td><span className="ord-amount">₹{o.total.toLocaleString('en-IN')}</span></td>
                    <td>
                      <span
                        className="inv-badge"
                        style={{ background: sc.bg, color: sc.color }}
                      >{o.status}</span>
                    </td>
                    <td className="inv-updated">{o.date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default OrdersPage;
