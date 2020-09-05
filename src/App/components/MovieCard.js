import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import Rating from './Rating';
import RatingPopover from './RatingPopover';

const Options = ({ remove, add, addToWatchlist }) => {
  const RemoveButton = () => (
    <Button size="sm" variant="outline-dark" onClick={remove}>
      Remove
    </Button>
  );

  const AddButton = () => (
    <Button block style={{ marginBottom: '1rem' }} size="sm" variant="outline-dark" onClick={add}>
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

  const [show, setShow] = useState(false);
  const target = useRef(null);

  useEffect(() => setShow(false), [rating]);

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
            {auth.uid &&
              (rating ? (
                <Rating
                  rating={rating}
                  setRating={setRating}
                  removable
                  removeRating={removeRating}
                />
              ) : (
                <div>
                  <Button
                    ref={target}
                    size="sm"
                    style={{ position: 'relative', zIndex: 100 }}
                    onClick={() => setShow(!show)}
                  >
                    Rate it
                  </Button>
                  <RatingPopover
                    target={target}
                    show={show}
                    setShow={setShow}
                    placement="bottom"
                    setRating={setRating}
                  />
                </div>
              ))}
          </Card.Body>
          <Options remove={remove} add={add} addToWatchlist={addToWatchlist} />
        </Col>
      </Row>
    </Card>
  );
}

export default MovieCard;
