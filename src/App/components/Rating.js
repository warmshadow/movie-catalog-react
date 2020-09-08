import React, { useState } from 'react';
import RatingSymbols from 'react-rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fasStar, faTimes } from '@fortawesome/free-solid-svg-icons';

function Rating({ rating, setRating, removable, removeRating }) {
  const [showRemove, setShowRemove] = useState(false);

  const RemoveButton = () => (
    <span
      role="button"
      className={`${showRemove ? 'd-inline' : 'd-none'} position-absolute right-0`}
    >
      <FontAwesomeIcon icon={faTimes} onClick={removeRating} />
    </span>
  );

  return (
    <div
      className="d-inline-block position-relative z-index-100 px-3"
      onMouseEnter={removable ? () => setShowRemove(true) : null}
      onMouseLeave={removable ? () => setShowRemove(false) : null}
    >
      <RatingSymbols
        emptySymbol={<FontAwesomeIcon icon={farStar} />}
        fullSymbol={<FontAwesomeIcon icon={fasStar} />}
        initialRating={rating}
        onClick={(newRating) => setRating(newRating)}
        fractions={2}
      />
      <RemoveButton />
    </div>
  );
}

export default Rating;
