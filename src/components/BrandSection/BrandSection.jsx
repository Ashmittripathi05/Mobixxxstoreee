import { Link } from 'react-router-dom';
import { brands } from '../../data/brands';
import './BrandSection.css';

const BrandSection = () => {
  return (
    <section className="brands-section">
      <div className="container">
        <div className="brands-section__header anim">
          <h2 className="section-heading">Shop by Brand</h2>
          <Link to="/mobiles" className="brands-section__view-all">View all →</Link>
        </div>
        <div className="brands-grid stagger-grid">
          {brands.map(brand => (
            <Link
              key={brand.id}
              to={`/mobiles?brand=${brand.name}`}
              className="brand-card anim"
              style={{ '--brand-color': brand.color, '--brand-bg': brand.bgColor }}
            >
              <span className="brand-card__logo" style={{ color: brand.color, background: brand.bgColor }}>
                {brand.logo}
              </span>
              <span className="brand-card__name">{brand.name}</span>
              <span className="brand-card__count">{brand.productCount} phones</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandSection;
