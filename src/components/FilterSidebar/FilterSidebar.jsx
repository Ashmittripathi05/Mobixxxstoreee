import './FilterSidebar.css';

const brandsList = ['Apple', 'Samsung', 'OnePlus', 'Xiaomi', 'Vivo', 'OPPO', 'Realme', 'Motorola', 'Google', 'Nothing'];
const priceRanges = [
  { id: 'under20k', label: 'Under ₹20,000' },
  { id: '20kto40k', label: '₹20,000 – ₹40,000' },
  { id: '40kto70k', label: '₹40,000 – ₹70,000' },
  { id: 'above70k', label: 'Above ₹70,000' },
];
const storageList = ['128GB', '256GB', '512GB', '1TB'];
const ramList = ['6GB', '8GB', '12GB', '16GB'];

const FilterSidebar = ({ filters, onChange }) => {
  const toggleBrand = (brand) => {
    const next = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    onChange({ ...filters, brands: next });
  };

  const togglePrice = (id) => {
    const next = filters.priceRanges.includes(id)
      ? filters.priceRanges.filter(p => p !== id)
      : [...filters.priceRanges, id];
    onChange({ ...filters, priceRanges: next });
  };

  const toggleStorage = (s) => {
    const next = filters.storage.includes(s)
      ? filters.storage.filter(x => x !== s)
      : [...filters.storage, s];
    onChange({ ...filters, storage: next });
  };

  const toggleRam = (r) => {
    const next = filters.ram.includes(r)
      ? filters.ram.filter(x => x !== r)
      : [...filters.ram, r];
    onChange({ ...filters, ram: next });
  };

  const hasFilters = filters.brands.length > 0 || filters.priceRanges.length > 0 || filters.storage.length > 0 || filters.ram.length > 0;

  const clearAll = () => onChange({ brands: [], priceRanges: [], storage: [], ram: [] });

  return (
    <aside className="filter-sidebar">
      <div className="filter-sidebar__header">
        <span className="filter-sidebar__title">Filters</span>
        {hasFilters && (
          <button className="filter-sidebar__clear" onClick={clearAll}>Clear all</button>
        )}
      </div>

      {/* Brand */}
      <div className="filter-group">
        <h4 className="filter-group__title">Brand</h4>
        <ul className="filter-group__list">
          {brandsList.map(brand => (
            <li key={brand}>
              <label className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={filters.brands.includes(brand)}
                  onChange={() => toggleBrand(brand)}
                />
                <span className="filter-checkbox__box" />
                <span className="filter-checkbox__label">{brand}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Price */}
      <div className="filter-group">
        <h4 className="filter-group__title">Price Range</h4>
        <ul className="filter-group__list">
          {priceRanges.map(p => (
            <li key={p.id}>
              <label className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={filters.priceRanges.includes(p.id)}
                  onChange={() => togglePrice(p.id)}
                />
                <span className="filter-checkbox__box" />
                <span className="filter-checkbox__label">{p.label}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Storage */}
      <div className="filter-group">
        <h4 className="filter-group__title">Storage</h4>
        <div className="filter-chips">
          {storageList.map(s => (
            <button
              key={s}
              className={`filter-chip${filters.storage.includes(s) ? ' filter-chip--active' : ''}`}
              onClick={() => toggleStorage(s)}
            >{s}</button>
          ))}
        </div>
      </div>

      {/* RAM */}
      <div className="filter-group">
        <h4 className="filter-group__title">RAM</h4>
        <div className="filter-chips">
          {ramList.map(r => (
            <button
              key={r}
              className={`filter-chip${filters.ram.includes(r) ? ' filter-chip--active' : ''}`}
              onClick={() => toggleRam(r)}
            >{r}</button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
