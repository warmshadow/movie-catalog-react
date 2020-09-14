import React from 'react';
import { PaginationContext } from './PaginationContext';

function withPaginationContext(Component) {
  return function WithPagination() {
    return (
      <PaginationContext.Consumer>
        {(value) => <Component context={value} />}
      </PaginationContext.Consumer>
    );
  };
}

export default withPaginationContext;
