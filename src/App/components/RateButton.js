/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Rating from './Rating';

function RateButton({ placement, setRating }) {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  const ratingPopover = (props) => {
    const CloseButton = () => (
      <span
        style={{
          position: 'absolute',
          right: 10,
          color: 'darkred',
          cursor: 'pointer',
        }}
      >
        <FontAwesomeIcon icon={faTimes} onClick={() => setShow(false)} />
      </span>
    );

    return (
      // eslint-disable-next-line react/destructuring-assignment
      <Popover {...props} style={{ ...props.style, zIndex: 100, textAlign: 'center' }}>
        <Popover.Title as="h5" className="px-5">
          Your rating
          <CloseButton />
        </Popover.Title>
        <Popover.Content>
          <Rating setRating={setRating} />
        </Popover.Content>
      </Popover>
    );
  };

  return (
    <div>
      <Button
        ref={target}
        size="sm"
        style={{
          position: 'relative',
          zIndex: 100,
        }}
        onClick={() => setShow(!show)}
      >
        Rate it
      </Button>
      <Overlay
        target={target.current}
        rootClose
        onHide={() => setShow(false)}
        show={show}
        placement={placement}
      >
        {(props) => ratingPopover(props)}
      </Overlay>
    </div>
  );
}

export default RateButton;
