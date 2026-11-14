import { useState, useMemo } from 'react';
import AdminLayout from './AdminLayout';
import { useInventory } from '../../context/InventoryContext';
import './Inventory.css';
import './Products.css';

/* ─── Icons ─────────────────────────────────────────────────────────────── */
const SearchIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
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

/* ─── Full product edit modal ─────────────────────────────────────────────── */
const EditModal = ({ item, onSave, onClose }) => {
  const [form, setForm] = useState({
    name:              item.name,
    brand:             item.brand,
    price:             item.price,
    originalPrice:     item.originalPrice,
    discount:          item.discount,
    quantity:          item.quantity,
    lowStockThreshold: item.lowStockThreshold,
    isActive:          item.isActive,
  });
  const [saved, setSaved] = useState(false);

  const set = (field, val) => setForm(prev => ({ ...prev, [field]: val }));

  const handleSave = () => {
    onSave(item.id, {
      name:              form.name.trim() || item.name,
      brand:             form.brand.trim() || item.brand,
      price:             Math.max(0, Number(form.price)),
      originalPrice:     Math.max(0, Number(form.originalPrice)),
      discount:          Math.max(0, Math.min(100, Number(form.discount))),
      quantity:          Math.max(0, Number(form.quantity)),
      lowStockThreshold: Math.max(1, Number(form.lowStockThreshold)),
      isActive:          form.isActive,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="inv-modal-overlay" onClick={onClose}>
      <div className="inv-modal" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="inv-modal-header">
          <div className="inv-modal-title">
            <img src={item.image} alt={item.name} className="inv-modal-img" />
            <div>
              <p className="inv-modal-brand">{item.brand}</p>
              <p className="inv-modal-name">{item.name}</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {saved && <span className="inv-saved-badge">✓ Saved</span>}
            <button className="inv-modal-close" onClick={onClose}><XIcon /></button>
          </div>
        </div>

        {/* Body */}
        <div className="inv-modal-body">
          {/* Product identity */}
          <p className="prod-section-label">Product Details</p>
          <div className="inv-form-row">
            <label>Product Name
              <input className="inv-input" value={form.name}
                onChange={e => set('name', e.target.value)} />
            </label>
          </div>
          <div className="inv-form-row">
            <label>Brand
              <input className="inv-input" value={form.brand}
                onChange={e => set('brand', e.target.value)} />
            </label>
          </div>

          {/* Pricing */}
          <p className="prod-section-label" style={{ marginTop: 16 }}>Pricing</p>
          <div className="inv-form-grid">
            <label>Selling Price (₹)
              <input className="inv-input" type="number" min="0"
                value={form.price}
                onChange={e => set('price', e.target.value)} />
            </label>
            <label>MRP / Original Price (₹)
              <input className="inv-input" type="number" min="0"
                value={form.originalPrice}
                onChange={e => set('originalPrice', e.target.value)} />
            </label>
            <label>Discount (%)
              <input className="inv-input" type="number" min="0" max="100"
                value={form.discount}
                onChange={e => set('discount', e.target.value)} />
            </label>
          </div>

          {/* Stock */}
          <p className="prod-section-label" style={{ marginTop: 16 }}>Stock</p>
          <div className="inv-form-grid">
            <label>Stock Quantity (units)
              <input className="inv-input" type="number" min="0"
                value={form.quantity}
                onChange={e => set('quantity', e.target.value)} />
            </label>
            <label>Low Stock Alert at (units)
              <input className="inv-input" type="number" min="1"
                value={form.lowStockThreshold}
                onChange={e => set('lowStockThreshold', e.target.value)} />
            </label>
          </div>

          {/* Status */}
          <p className="prod-section-label" style={{ marginTop: 16 }}>Visibility</p>
          <div
            className="inv-toggle-row"
            onClick={() => set('isActive', !form.isActive)}
            style={{ cursor: 'pointer' }}
          >
            {form.isActive ? <ToggleOnIcon /> : <ToggleOffIcon />}
            <span style={{ marginLeft: 10, fontSize: 13.5, color: form.isActive ? '#10B981' : '#94A3B8', fontWeight: 600 }}>
              {form.isActive ? 'Active — visible to customers' : 'Inactive — hidden from store'}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="inv-modal-footer">
          <button className="inv-btn inv-btn--ghost" onClick={onClose}>Close</button>
          <button className="inv-btn inv-btn--save" onClick={handleSave}>
            <SaveIcon /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─── Products Page ───────────────────────────────────────────────────────── */
const ProductsPage = () => {
  const { allItems, updateProduct } = useInventory();
  const [search, setSearch]   = useState('');
  const [brand,  setBrand]    = useState('All');
  const [editItem, setEditItem] = useState(null);

  const brands = ['All', ...Array.from(new Set(allItems.map(i => i.brand))).sort()];

  const visible = useMemo(() => {
    let list = [...allItems].sort((a, b) => a.name.localeCompare(b.name));
    if (brand !== 'All') list = list.filter(i => i.brand === brand);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(i => i.name.toLowerCase().includes(q) || i.brand.toLowerCase().includes(q));
    }
    return list;
  }, [allItems, brand, search]);

  const handleSave = (id, fields) => updateProduct(id, fields);

  return (
    <AdminLayout>
      {/* Header */}
      <div className="admin-page-header">
        <div>
          <p className="admin-page-title">Products</p>
          <p className="admin-page-sub">
            Edit product name, brand, price, discount, stock quantity, and visibility.
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="inv-toolbar">
        <div className="inv-search-wrap">
          <SearchIcon />
          <input
            className="inv-search"
            placeholder="Search products…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="inv-filter-tabs">
          {brands.map(b => (
            <button
              key={b}
              className={`inv-filter-tab${brand === b ? ' inv-filter-tab--active' : ''}`}
              onClick={() => setBrand(b)}
            >{b}</button>
          ))}
        </div>
      </div>

      {/* Product grid */}
      <div className="prod-grid">
        {visible.length === 0 ? (
          <div className="inv-empty" style={{ gridColumn: '1/-1' }}>No products found.</div>
        ) : visible.map(item => (
          <div
            key={item.id}
            className={`prod-card${!item.isActive ? ' prod-card--inactive' : ''}`}
          >
            <div className="prod-card__img-wrap">
              <img src={item.image} alt={item.name} className="prod-card__img" />
              <span className={`prod-card__status${item.isActive ? ' prod-card__status--on' : ''}`}>
                {item.isActive ? 'Active' : 'Inactive'}
              </span>
              {item.quantity === 0 && (
                <span className="prod-card__oos">Out of Stock</span>
              )}
              {item.quantity > 0 && item.quantity <= item.lowStockThreshold && (
                <span className="prod-card__low">Low Stock</span>
              )}
            </div>
            <div className="prod-card__body">
              <p className="prod-card__brand">{item.brand}</p>
              <p className="prod-card__name">{item.name}</p>
              <div className="prod-card__pricing">
                <span className="prod-card__price">₹{item.price.toLocaleString('en-IN')}</span>
                <span className="prod-card__mrp">₹{item.originalPrice.toLocaleString('en-IN')}</span>
                <span className="prod-card__disc">{item.discount}% off</span>
              </div>
              <div className="prod-card__stock">
                Stock: <strong style={{ color: item.quantity === 0 ? '#EF4444' : item.quantity <= item.lowStockThreshold ? '#F59E0B' : '#10B981' }}>
                  {item.quantity} units
                </strong>
              </div>
            </div>
            <div className="prod-card__footer">
              <button
                className="inv-btn inv-btn--edit inv-btn--sm"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => setEditItem(item)}
              >
                <EditIcon /> Edit Product
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editItem && (
        <EditModal
          item={editItem}
          onSave={(id, fields) => { handleSave(id, fields); setEditItem(prev => ({ ...prev, ...fields })); }}
          onClose={() => setEditItem(null)}
        />
      )}
    </AdminLayout>
  );
};

export default ProductsPage;
