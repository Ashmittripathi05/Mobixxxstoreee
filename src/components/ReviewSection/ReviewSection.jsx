import { reviews } from '../../data/products';
import './ReviewSection.css';

const StarRating = ({ rating }) => (
  <div className="stars" aria-label={`${rating} out of 5`}>
    {[1,2,3,4,5].map(i => (
      <span key={i} className={`star${i > rating ? ' star-empty' : ''}`}>★</span>
    ))}
  </div>
);

const VerifiedIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const ReviewSection = () => {
  return (
    <section className="reviews-section">
      <div className="container">
        <div className="reviews-section__header anim">
          <div>
            <h2 className="section-heading">Customer Reviews</h2>
            <p className="section-sub">What our customers say about their experience</p>
          </div>
          <div className="reviews-section__summary">
            <span className="reviews-summary__score">4.6</span>
            <div>
              <StarRating rating={5} />
              <span className="reviews-summary__count">Based on 500+ reviews</span>
            </div>
          </div>
        </div>
        <div className="reviews-grid stagger-grid">
          {reviews.map(review => (
            <div key={review.id} className="review-card anim">
              <div className="review-card__top">
                <StarRating rating={review.rating} />
                {review.verified && (
                  <span className="review-card__verified">
                    <VerifiedIcon /> Verified Purchase
                  </span>
                )}
              </div>
              <h4 className="review-card__title">{review.title}</h4>
              <p className="review-card__body">"{review.body}"</p>
              <div className="review-card__footer">
                <span className="review-card__author">{review.author}</span>
                <span className="review-card__location">{review.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
