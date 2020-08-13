import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function MovieCard() {
  const movie = {
    poster:
      'https://cdn.cinematerial.com/p/297x/2m4v8shm/tampopo-japanese-movie-poster-md.jpg?v=1531105865',
    title: 'Tampopo',
    release_date: 1985,
  };

  return (
    <Card>
      <Row noGutters style={{ width: '100%' }}>
        <Col md={2}>
          <Card.Img src={movie.poster} />
        </Col>
        <Col md={10} className="d-flex align-items-center">
          <Card.Body>
            <Card.Title>{movie.title}</Card.Title>
            <Card.Subtitle>{movie.release_date}</Card.Subtitle>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}

export default MovieCard;
