import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import FilterSidebar from '../../components/FilterSidebar/FilterSidebar';
import { products } from '../../data/products';
import './Shop.css';

const sortOptions = [
  { id: 'popular', label: 'Most Popular' },
  { id: 'low-high', label: 'Price: Low to High' },
  { id: 'high-low', label: 'Price: High to Low' },
  { id: 'newest', label: 'Newest First' },
];

const priceRangeMap = {
  under20k: (p) => p.price < 20000,
  '20kto40k': (p) => p.price >= 20000 && p.price <= 40000,
  '40kto70k': (p) => p.price > 40000 && p.price <= 70000,
  above70k: (p) => p.price > 70000,
};

const FilterIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
  </svg>
);

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState('popular');
  const [filters, setFilters] = useState({
    brands: searchParams.get('brand') ? [searchParams.get('brand')] : [],
    priceRanges: [],
    storage: [],
    ram: [],
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const searchQuery = searchParams.get('search') || '';

  // Sync brand param to filters
  useEffect(() => {
    const brand = searchParams.get('brand');
    if (brand) setFilters(prev => ({ ...prev, brands: [brand] }));
  }, []);

  const filtered = useMemo(() => {
    let result = [...products];

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
      );
    }

    // Brand
    if (filters.brands.length > 0) {
      result = result.filter(p => filters.brands.includes(p.brand));
    }

    // Price
    if (filters.priceRanges.length > 0) {
      result = result.filter(p => filters.priceRanges.some(r => priceRangeMap[r]?.(p)));
    }

    // Storage
    if (filters.storage.length > 0) {
      result = result.filter(p => p.storageOptions?.some(s => filters.storage.includes(s)));
    }

    // RAM
    if (filters.ram.length > 0) {
      result = result.filter(p => p.ramOptions?.some(r => filters.ram.includes(r)));
    }

    // Sort
    if (sort === 'low-high') result.sort((a, b) => a.price - b.price);
    else if (sort === 'high-low') result.sort((a, b) => b.price - a.price);
    else if (sort === 'newest') result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    else result.sort((a, b) => b.reviewCount - a.reviewCount);

    return result;
  }, [filters, sort, searchQuery]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    // Clear brand param from URL when filters change
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      next.delete('brand');
      return next;
    });
  };

  return (
    <div className="page-wrapper">
      <div className="shop-page">
        <div className="container shop-page__inner">
          {/* Breadcrumb */}
          <nav className="breadcrumb">
            <a href="/">Home</a> <span>/</span> <span>Mobiles</span>
            {searchQuery && <><span>/</span><span>Search: "{searchQuery}"</span></>}
          </nav>

          <div className="shop-layout">
            {/* Sidebar */}
            <div className={`shop-sidebar${mobileFiltersOpen ? ' shop-sidebar--open' : ''}`}>
              <FilterSidebar filters={filters} onChange={handleFiltersChange} />
            </div>

            {/* Main */}
            <div className="shop-main">
              {/* Toolbar */}
              <div className="shop-toolbar">
                <div className="shop-toolbar__left">
                  <button
                    className="btn btn-outline btn-sm shop-filter-toggle"
                    onClick={() => setMobileFiltersOpen(v => !v)}
                  >
                    <FilterIcon /> Filters
                  </button>
                  <span className="shop-toolbar__count">
                    {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
                    {searchQuery && ` for "${searchQuery}"`}
                  </span>
                </div>
                <div className="shop-toolbar__right">
                  <label className="shop-toolbar__sort-label" htmlFor="shop-sort">Sort by:</label>
                  <select
                    id="shop-sort"
                    className="shop-toolbar__sort form-select"
                    value={sort}
                    onChange={e => setSort(e.target.value)}
                  >
                    {sortOptions.map(o => (
                      <option key={o.id} value={o.id}>{o.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Active filter chips */}
              {(filters.brands.length > 0 || filters.priceRanges.length > 0 || filters.storage.length > 0 || filters.ram.length > 0) && (
                <div className="active-filters">
                  {filters.brands.map(b => (
                    <span key={b} className="active-filter-chip">
                      {b}
                      <button onClick={() => handleFiltersChange({ ...filters, brands: filters.brands.filter(x => x !== b) })}>×</button>
                    </span>
                  ))}
                  {filters.priceRanges.map(r => (
                    <span key={r} className="active-filter-chip">
                      {r}
                      <button onClick={() => handleFiltersChange({ ...filters, priceRanges: filters.priceRanges.filter(x => x !== r) })}>×</button>
                    </span>
                  ))}
                  {filters.storage.map(s => (
                    <span key={s} className="active-filter-chip">
                      {s}
                      <button onClick={() => handleFiltersChange({ ...filters, storage: filters.storage.filter(x => x !== s) })}>×</button>
                    </span>
                  ))}
                  {filters.ram.map(r => (
                    <span key={r} className="active-filter-chip">
                      {r} RAM
                      <button onClick={() => handleFiltersChange({ ...filters, ram: filters.ram.filter(x => x !== r) })}>×</button>
                    </span>
                  ))}
                </div>
              )}

              {/* Grid */}
              {filtered.length > 0 ? (
                <div className="shop-grid">
                  {filtered.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="shop-empty">
                  <span className="shop-empty__icon">📱</span>
                  <h3>No products found</h3>
                  <p>Try adjusting your filters or search terms.</p>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleFiltersChange({ brands: [], priceRanges: [], storage: [], ram: [] })}
                  >Clear Filters</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
