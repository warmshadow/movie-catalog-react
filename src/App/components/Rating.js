import React from 'react';
import RatingSymbols from 'react-rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';

function Rating() {
  return (
    <>
      <RatingSymbols
        emptySymbol={<FontAwesomeIcon icon={farStar} size="lg" />}
        fullSymbol={<FontAwesomeIcon icon={fasStar} size="lg" />}
        onClick={(score) => console.log(score)}
        fractions={2}
      />
    </>
  );
}

export default Rating;
