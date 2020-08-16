import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import clsx from 'clsx';

function Wrapper({ page, children }) {
  const firstPage = page === 1;
  const classes = clsx('d-flex', {
    'justify-content-end': firstPage,
    'justify-content-between': !firstPage,
  });

  return <div className={classes}>{children}</div>;
}

function PageLink({ path, num }) {
  return (
    <Link to={path}>
      <Button>{`Page ${num}`}</Button>
    </Link>
  );
}

function PageLinks({ page, totalPages, basePath }) {
  const [prev, next] = [page - 1, page + 1];
  const [prevPath, nextPath] = [`${basePath}/${prev}`, `${basePath}/${next}`];

  let links;

  if (totalPages === 1) {
    links = null;
  } else if (page === 1) {
    links = <PageLink path={nextPath} num={next} />;
  } else if (page < totalPages) {
    links = (
      <>
        <PageLink path={prevPath} num={prev} />
        <PageLink path={nextPath} num={next} />
      </>
    );
  } else links = <PageLink path={prevPath} num={prev} />;

  return <Wrapper page={page}>{links}</Wrapper>;
}

export default PageLinks;
