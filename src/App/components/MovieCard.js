import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import Rating from './Rating';
import RateButton from './RateButton';

const OptionButtons = ({ remove, add, addToWatchlist }) => {
  const RemoveButton = () => (
    <Button size="sm" variant="outline-dark" onClick={remove}>
      Remove
    </Button>
  );

  const AddButton = () => (
    <Button
      block
      style={{
        marginBottom: '1rem',
      }}
      size="sm"
      variant="outline-dark"
      onClick={add}
    >
      Add To List
    </Button>
  );

  const AddToWatchlistButton = () => (
    <Button size="sm" variant="outline-dark" onClick={addToWatchlist}>
      Add To Watchlist
    </Button>
  );

  return (
    <Card.Body
      className="d-flex flex-column align-items-center justify-content-center"
      style={{
        position: 'absolute',
        right: 0,
        zIndex: 100,
        height: '100%',
      }}
    >
      {add && <AddButton />}
      {remove && <RemoveButton />}
      {addToWatchlist && <AddToWatchlistButton />}
    </Card.Body>
  );
};

const renderRating = (rating, setRating, removeRating) => {
  return rating ? (
    <Rating rating={rating} setRating={setRating} removable removeRating={removeRating} />
  ) : (
    <RateButton placement="bottom" setRating={setRating} />
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
  addToWatchlist,
  setRating,
  removeRating,
}) {
  const { auth } = useSelector((state) => state.firebase);

  return (
    <Card bg="secondary" className="text-dark mb-4 moviecard">
      <Row noGutters>
        <Link to={`/movie/${id}`} className="text-decoration-none stretched-link" />
        <Col md={2}>
          <Card.Img src={`${baseUrl}w342${posterPath}`} />
        </Col>
        <Col md={10} className="d-flex align-items-center">
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Subtitle style={{ lineHeight: 3 }}>{releaseDate}</Card.Subtitle>
            <Card.Subtitle
              style={{
                fontWeight: 'bold',
                lineHeight: 3,
              }}
            >
              {voteAverage}
            </Card.Subtitle>
            {auth.uid && renderRating(rating, setRating, removeRating)}
          </Card.Body>
          <OptionButtons remove={remove} add={add} addToWatchlist={addToWatchlist} />
        </Col>
      </Row>
    </Card>
  );
}

export default MovieCard;
