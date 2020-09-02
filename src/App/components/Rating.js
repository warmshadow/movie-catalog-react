import React from 'react';
import RatingSymbols from 'react-rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';

function Rating({ score }) {
  return (
    <>
      <RatingSymbols
        style={{
          position: 'relative',
          zIndex: 100,
        }}
        emptySymbol={<FontAwesomeIcon icon={farStar} />}
        fullSymbol={<FontAwesomeIcon icon={fasStar} />}
        initialRating={score}
        onClick={(newScore) => console.log(newScore)}
        fractions={2}
      />
    </>
  );
}

export default Rating;