import React, { useState } from 'react';
import RatingSymbols from 'react-rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fasStar, faTimes } from '@fortawesome/free-solid-svg-icons';

function Rating({ rating, setRating, removable, removeRating }) {
  const [showRemove, setShowRemove] = useState(false);

  return (
    <div
      style={{
        display: 'inline-block',
        position: 'relative',
        zIndex: '100',
        padding: '0 1.2rem',
      }}
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
      <span
        style={{
          display: `${showRemove ? 'inline' : 'none'}`,
          position: 'absolute',
          right: 0,
          cursor: 'pointer',
        }}
      >
        <FontAwesomeIcon icon={faTimes} onClick={removeRating} />
      </span>
    </div>
  );
}

export default Rating;
