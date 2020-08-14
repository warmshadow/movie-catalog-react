import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function MovieCard({ movie, baseUrl }) {
  return (
    <Link to={`/movie/${movie.id}`}>
      <Card>
        <Row noGutters style={{ width: '100%' }}>
          <Col md={2}>
            <Card.Img src={`${baseUrl}w342${movie.poster_path}`} />
          </Col>
          <Col md={10} className="d-flex align-items-center">
            <Card.Body>
              <Card.Title>{movie.title}</Card.Title>
              <Card.Subtitle>{movie.release_date}</Card.Subtitle>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Link>
  );
}

export default MovieCard;
