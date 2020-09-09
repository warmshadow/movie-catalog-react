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
    <Button className="option-btn" block size="sm" variant="outline-dark" onClick={add}>
      Add To List
    </Button>
  );

  const AddToWatchlistButton = () => (
    <Button size="sm" variant="outline-dark" onClick={addToWatchlist}>
      Add To Watchlist
    </Button>
  );

  return (
    <>
      {add && <AddButton />}
      {remove && <RemoveButton />}
      {addToWatchlist && <AddToWatchlistButton />}
    </>
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
          <Card.Img src={`${baseUrl}w342${posterPath}`} alt="Poster" />
        </Col>
        <Col md={10} className="d-flex align-items-center">
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Subtitle className="moviecard-subtitle">{releaseDate}</Card.Subtitle>
            <Card.Subtitle className="moviecard-subtitle font-weight-bold">
              {voteAverage}
            </Card.Subtitle>
            {auth.uid && renderRating(rating, setRating, removeRating)}
          </Card.Body>
          <Card.Body className="moviecard-options d-flex flex-column align-items-center justify-content-center">
            <OptionButtons remove={remove} add={add} addToWatchlist={addToWatchlist} />
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}

export default MovieCard;
