import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function MovieCard({ id, posterPath, title, releaseDate, baseUrl }) {
  return (
    <Link to={`/movie/${id}`}>
      <Card>
        <Row noGutters style={{ width: '100%' }}>
          <Col md={2}>
            <Card.Img src={`${baseUrl}w342${posterPath}`} />
          </Col>
          <Col md={10} className="d-flex align-items-center">
            <Card.Body>
              <Card.Title>{title}</Card.Title>
              <Card.Subtitle>{releaseDate}</Card.Subtitle>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Link>
  );
}

export default MovieCard;
