/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import './AlertTooltip.css';

function AlertTooltip({ target, show, placement, content }) {
  return (
    <Overlay target={target.current} show={show} placement={placement}>
      {(props) => {
        return <Tooltip {...props}>{content}</Tooltip>;
      }}
    </Overlay>
  );
}

export default AlertTooltip;
