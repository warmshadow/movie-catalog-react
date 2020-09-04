/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Rating from './Rating';

function RatingPopover({ target, show, setShow, placement, setRating }) {
  return (
    <Overlay
      target={target.current}
      rootClose
      onHide={() => setShow(false)}
      show={show}
      placement={placement}
    >
      {(props) => {
        return (
          <Popover {...props} style={{ ...props.style, zIndex: 100 }}>
            <Popover.Title as="h5" className="px-5">
              Your rating
              <span
                style={{ position: 'absolute', right: 10, color: 'darkred', cursor: 'pointer' }}
              >
                <FontAwesomeIcon icon={faTimes} onClick={() => setShow(false)} />
              </span>
            </Popover.Title>
            <Popover.Content style={{ textAlign: 'center' }}>
              <Rating setRating={setRating} />
            </Popover.Content>
          </Popover>
        );
      }}
    </Overlay>
  );
}

export default RatingPopover;
