import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1 className="mt-3 mb-5">Home page</h1>
      <ListGroup>
        <ListGroup.Item>
          <Link to="/category/toprated">Top Rated</Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <Link to="/category/popular">Popular</Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <Link to="/category/documentary">Documentary</Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <Link to="/category/lithuanian">Lithuanian</Link>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}

export default Home;
