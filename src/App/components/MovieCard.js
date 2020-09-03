import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import Rating from './Rating';

const Options = ({ remove, add }) => {
  const RemoveButton = () => (
    <Button variant="outline-dark" onClick={remove}>
      Remove
    </Button>
  );

  const AddButton = () => (
    <Button variant="outline-dark" onClick={add}>
      Add To List
    </Button>
  );

  return (
    <Card.Body
      className="d-flex align-items-center justify-content-center"
      style={{
        position: 'absolute',
        right: 0,
        zIndex: 100,
      }}
    >
      {remove ? <RemoveButton /> : <AddButton />}
    </Card.Body>
  );
};

function MovieCard({
  id,
  posterPath,
  title,
  releaseDate,
  voteAverage,
  rating,
  baseUrl,
  remove,
  add,
  setRating,
}) {
  const { auth } = useSelector((state) => state.firebase);
  return (
    <Card bg="secondary" className="text-dark mb-4 moviecard">
      <Row noGutters style={{ width: '100%' }}>
        <Link to={`/movie/${id}`} className="text-decoration-none stretched-link" />
        <Col md={2}>
          <Card.Img src={`${baseUrl}w342${posterPath}`} />
        </Col>
        <Col md={10} className="d-flex align-items-center">
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Subtitle style={{ lineHeight: 3 }}>{releaseDate}</Card.Subtitle>
            <Card.Subtitle style={{ fontWeight: 'bold', lineHeight: 3 }}>
              {voteAverage}
            </Card.Subtitle>
            {auth.uid && <Rating rating={rating || 0} setRating={setRating} />}
          </Card.Body>
          <Options remove={remove} add={add} />
        </Col>
      </Row>
    </Card>
  );
}

export default MovieCard;
