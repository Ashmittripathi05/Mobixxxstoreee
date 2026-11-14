import { useState, useMemo } from 'react';
import AdminLayout from './AdminLayout';
import { useInventory } from '../../context/InventoryContext';
import './Inventory.css';

/* ─── Icons ─────────────────────────────────────────────────────────────── */
const SearchIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const MinusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const SaveIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/>
    <polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
  </svg>
);
const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const RefreshIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10"/>
    <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/>
  </svg>
);
const AlertIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);
const ToggleOnIcon = () => (
  <svg width="22" height="13" viewBox="0 0 44 24" fill="none">
    <rect width="44" height="24" rx="12" fill="#10B981"/>
    <circle cx="32" cy="12" r="9" fill="white"/>
  </svg>
);
const ToggleOffIcon = () => (
  <svg width="22" height="13" viewBox="0 0 44 24" fill="none">
    <rect width="44" height="24" rx="12" fill="#CBD5E1"/>
    <circle cx="12" cy="12" r="9" fill="white"/>
  </svg>
);

/* ─── Stock badge ────────────────────────────────────────────────────────── */
const StockBadge = ({ qty, threshold }) => {
  if (qty === 0)   return <span className="inv-badge inv-badge--out">Out of Stock</span>;
  if (qty <= threshold) return <span className="inv-badge inv-badge--low">Low Stock</span>;
  return <span className="inv-badge inv-badge--ok">In Stock</span>;
};

/* ─── Inline stock quantity editor ──────────────────────────────────────── */
const StockEditor = ({ item, onAdjust }) => {
  const [delta, setDelta] = useState('');

  const apply = (dir) => {
    const val = parseInt(delta, 10);
    if (!isNaN(val) && val > 0) {
      onAdjust(item.id, dir === '+' ? val : -val);
      setDelta('');
    }
  };

  return (
    <div className="inv-stock-editor">
      <button
        className="inv-qty-btn inv-qty-btn--minus"
        onClick={() => onAdjust(item.id, -1)}
        title="Remove 1"
      ><MinusIcon /></button>

      <span className="inv-qty-display">{item.quantity}</span>

      <button
        className="inv-qty-btn inv-qty-btn--plus"
        onClick={() => onAdjust(item.id, +1)}
        title="Add 1"
      ><PlusIcon /></button>

      <input
        className="inv-delta-input"
        type="number"
        min="1"
        placeholder="qty"
        value={delta}
        onChange={e => setDelta(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter') apply('+'); }}
      />
      <button className="inv-delta-add" onClick={() => apply('+')} title="Add quantity">+</button>
      <button className="inv-delta-sub" onClick={() => apply('-')} title="Remove quantity">−</button>
    </div>
  );
};

/* ─── Full product edit modal ────────────────────────────────────────────── */
const EditModal = ({ item, onSave, onClose }) => {
  const [form, setForm] = useState({
    name:              item.name,
    price:             item.price,
    originalPrice:     item.originalPrice,
    discount:          item.discount,
    quantity:          item.quantity,
    lowStockThreshold: item.lowStockThreshold,
    isActive:          item.isActive,
  });

  const set = (field, val) => setForm(prev => ({ ...prev, [field]: val }));

  const handleSave = () => {
    onSave(item.id, {
      name:              form.name.trim() || item.name,
      price:             Math.max(0, Number(form.price)),
      originalPrice:     Math.max(0, Number(form.originalPrice)),
      discount:          Math.max(0, Math.min(100, Number(form.discount))),
      quantity:          Math.max(0, Number(form.quantity)),
      lowStockThreshold: Math.max(1, Number(form.lowStockThreshold)),
      isActive:          form.isActive,
    });
    onClose();
  };

  return (
    <div className="inv-modal-overlay" onClick={onClose}>
      <div className="inv-modal" onClick={e => e.stopPropagation()}>
        <div className="inv-modal-header">
          <div className="inv-modal-title">
            <img src={item.image} alt={item.name} className="inv-modal-img" />
            <div>
              <p className="inv-modal-brand">{item.brand}</p>
              <p className="inv-modal-name">{item.name}</p>
            </div>
          </div>
          <button className="inv-modal-close" onClick={onClose}><XIcon /></button>
        </div>

        <div className="inv-modal-body">
          <div className="inv-form-row">
            <label>Product Name
              <input
                className="inv-input"
                value={form.name}
                onChange={e => set('name', e.target.value)}
              />
            </label>
          </div>

          <div className="inv-form-grid">
            <label>Selling Price (₹)
              <input
                className="inv-input"
                type="number" min="0"
                value={form.price}
                onChange={e => set('price', e.target.value)}
              />
            </label>
            <label>Original / MRP (₹)
              <input
                className="inv-input"
                type="number" min="0"
                value={form.originalPrice}
                onChange={e => set('originalPrice', e.target.value)}
              />
            </label>
            <label>Discount (%)
              <input
                className="inv-input"
                type="number" min="0" max="100"
                value={form.discount}
                onChange={e => set('discount', e.target.value)}
              />
            </label>
            <label>Stock Quantity
              <input
                className="inv-input"
                type="number" min="0"
                value={form.quantity}
                onChange={e => set('quantity', e.target.value)}
              />
            </label>
            <label>Low Stock Alert at
              <input
                className="inv-input"
                type="number" min="1"
                value={form.lowStockThreshold}
                onChange={e => set('lowStockThreshold', e.target.value)}
              />
            </label>
            <label>Status
              <div
                className="inv-toggle-row"
                onClick={() => set('isActive', !form.isActive)}
                style={{ cursor: 'pointer', marginTop: '8px' }}
              >
                {form.isActive ? <ToggleOnIcon /> : <ToggleOffIcon />}
                <span style={{ marginLeft: 8, color: form.isActive ? '#10B981' : '#94A3B8' }}>
                  {form.isActive ? 'Active (visible in store)' : 'Inactive (hidden from store)'}
                </span>
              </div>
            </label>
          </div>
        </div>

        <div className="inv-modal-footer">
          <button className="inv-btn inv-btn--ghost" onClick={onClose}>Cancel</button>
          <button className="inv-btn inv-btn--save" onClick={handleSave}>
            <SaveIcon /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─── Main Inventory page ─────────────────────────────────────────────────── */
const InventoryPage = () => {
  const {
    allItems,
    lowStockItems,
    outOfStockItems,
    totalStockValue,
    updateProduct,
    adjustStock,
    resetInventory,
  } = useInventory();

  const [search,    setSearch]    = useState('');
  const [filter,    setFilter]    = useState('all'); // all | low | out | active | inactive
  const [editItem,  setEditItem]  = useState(null);
  const [saved,     setSaved]     = useState(false);
  const [showReset, setShowReset] = useState(false);

  /* Filtered + searched list */
  const visible = useMemo(() => {
    let list = [...allItems].sort((a, b) => a.name.localeCompare(b.name));
    if (filter === 'low')      list = list.filter(i => i.quantity > 0 && i.quantity <= i.lowStockThreshold);
    if (filter === 'out')      list = list.filter(i => i.quantity === 0);
    if (filter === 'active')   list = list.filter(i => i.isActive);
    if (filter === 'inactive') list = list.filter(i => !i.isActive);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(i =>
        i.name.toLowerCase().includes(q) ||
        i.brand.toLowerCase().includes(q)
      );
    }
    return list;
  }, [allItems, filter, search]);

  const handleSave = (id, fields) => {
    updateProduct(id, fields);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleReset = () => {
    resetInventory();
    setShowReset(false);
  };

  return (
    <AdminLayout>
      {/* Page header */}
      <div className="admin-page-header">
        <div>
          <p className="admin-page-title">Inventory Management</p>
          <p className="admin-page-sub">
            Manage stock quantity, pricing, and product status. All changes save instantly.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {saved && <span className="inv-saved-badge">✓ Saved</span>}
          <button className="inv-btn inv-btn--ghost inv-btn--sm" onClick={() => setShowReset(true)}>
            <RefreshIcon /> Reset to Defaults
          </button>
        </div>
      </div>

      {/* Summary strip */}
      <div className="inv-summary-strip">
        <div className="inv-summary-card">
          <span className="inv-summary-label">Total SKUs</span>
          <span className="inv-summary-val">{allItems.length}</span>
        </div>
        <div className="inv-summary-card inv-summary-card--warn">
          <span className="inv-summary-label"><AlertIcon /> Low Stock</span>
          <span className="inv-summary-val">{lowStockItems.length}</span>
        </div>
        <div className="inv-summary-card inv-summary-card--danger">
          <span className="inv-summary-label">Out of Stock</span>
          <span className="inv-summary-val">{outOfStockItems.length}</span>
        </div>
        <div className="inv-summary-card inv-summary-card--blue">
          <span className="inv-summary-label">Stock Value</span>
          <span className="inv-summary-val">₹{(totalStockValue / 100000).toFixed(1)}L</span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="inv-toolbar">
        <div className="inv-search-wrap">
          <SearchIcon />
          <input
            className="inv-search"
            placeholder="Search by product name or brand…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="inv-filter-tabs">
          {[
            { key: 'all',      label: `All (${allItems.length})` },
            { key: 'low',      label: `Low Stock (${lowStockItems.length})` },
            { key: 'out',      label: `Out of Stock (${outOfStockItems.length})` },
            { key: 'active',   label: 'Active' },
            { key: 'inactive', label: 'Inactive' },
          ].map(t => (
            <button
              key={t.key}
              className={`inv-filter-tab${filter === t.key ? ' inv-filter-tab--active' : ''}`}
              onClick={() => setFilter(t.key)}
            >{t.label}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="admin-card inv-table-card">
        {visible.length === 0 ? (
          <div className="inv-empty">No products match your filter.</div>
        ) : (
          <div className="inv-table-wrap">
            <table className="inv-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Brand</th>
                  <th>Selling Price</th>
                  <th>MRP</th>
                  <th>Discount</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Last Updated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {visible.map(item => (
                  <tr key={item.id} className={!item.isActive ? 'inv-row--inactive' : ''}>
                    <td>
                      <div className="inv-product-cell">
                        <img src={item.image} alt={item.name} className="inv-thumb" />
                        <span className="inv-product-name">{item.name}</span>
                      </div>
                    </td>
                    <td><span className="inv-brand">{item.brand}</span></td>
                    <td className="inv-price">₹{item.price.toLocaleString('en-IN')}</td>
                    <td className="inv-mrp">₹{item.originalPrice.toLocaleString('en-IN')}</td>
                    <td>
                      <span className="inv-disc-badge">{item.discount}% off</span>
                    </td>
                    <td>
                      <div className="inv-stock-cell">
                        <StockBadge qty={item.quantity} threshold={item.lowStockThreshold} />
                        <StockEditor item={item} onAdjust={adjustStock} />
                      </div>
                    </td>
                    <td>
                      <button
                        className={`inv-toggle-btn${item.isActive ? ' inv-toggle-btn--on' : ''}`}
                        onClick={() => updateProduct(item.id, { isActive: !item.isActive })}
                        title={item.isActive ? 'Click to deactivate' : 'Click to activate'}
                      >
                        {item.isActive ? <ToggleOnIcon /> : <ToggleOffIcon />}
                        <span>{item.isActive ? 'Active' : 'Inactive'}</span>
                      </button>
                    </td>
                    <td className="inv-updated">
                      {new Date(item.lastUpdated).toLocaleString('en-IN', {
                        day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
                      })}
                    </td>
                    <td>
                      <button
                        className="inv-btn inv-btn--edit inv-btn--sm"
                        onClick={() => setEditItem(item)}
                      >
                        <EditIcon /> Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit modal */}
      {editItem && (
        <EditModal
          item={editItem}
          onSave={handleSave}
          onClose={() => setEditItem(null)}
        />
      )}

      {/* Reset confirm dialog */}
      {showReset && (
        <div className="inv-modal-overlay" onClick={() => setShowReset(false)}>
          <div className="inv-modal inv-modal--sm" onClick={e => e.stopPropagation()}>
            <div className="inv-modal-header">
              <p className="inv-modal-name" style={{ fontSize: 16 }}>
                Reset all inventory to defaults?
              </p>
              <button className="inv-modal-close" onClick={() => setShowReset(false)}><XIcon /></button>
            </div>
            <p style={{ padding: '12px 20px', color: '#64748B', fontSize: 14 }}>
              This will restore all stock quantities to 50 units and reset all prices to the original catalog values. This action cannot be undone.
            </p>
            <div className="inv-modal-footer">
              <button className="inv-btn inv-btn--ghost" onClick={() => setShowReset(false)}>Cancel</button>
              <button className="inv-btn inv-btn--danger" onClick={handleReset}>Yes, Reset All</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default InventoryPage;
