import React from 'react';

function Heading({ content, italic }) {
  return <h2 className={`${italic && 'font-italic'} mt-3 mb-5`}>{content}</h2>;
}

export default Heading;
