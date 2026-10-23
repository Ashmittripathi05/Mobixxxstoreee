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
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

/* Generate initials avatar color from author name */
const getAvatarColor = (name) => {
  const colors = [
    '#3B82F6', '#8B5CF6', '#10B981', '#F59E0B',
    '#EF4444', '#EC4899', '#06B6D4', '#F97316',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
};

const getInitials = (name) => {
  const parts = name.trim().split(' ');
  return parts.length >= 2
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : name.slice(0, 2).toUpperCase();
};

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
              <span className="reviews-summary__count">Based on 500+ verified reviews</span>
            </div>
          </div>
        </div>
        <div className="reviews-grid stagger-grid">
          {reviews.map(review => {
            const avatarColor = getAvatarColor(review.author);
            const initials = getInitials(review.author);
            return (
              <div key={review.id} className="review-card anim">
                <div className="review-card__top">
                  <StarRating rating={review.rating} />
                  {review.verified && (
                    <span className="review-card__verified">
                      <VerifiedIcon /> Verified
                    </span>
                  )}
                </div>
                <h4 className="review-card__title">&ldquo;{review.title}&rdquo;</h4>
                <p className="review-card__body">{review.body}</p>
                <div className="review-card__footer">
                  <div
                    className="review-card__avatar"
                    style={{ background: avatarColor + '22', color: avatarColor, border: `1.5px solid ${avatarColor}44` }}
                  >
                    {initials}
                  </div>
                  <div>
                    <span className="review-card__author">{review.author}</span>
                    <span className="review-card__location">{review.location}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
