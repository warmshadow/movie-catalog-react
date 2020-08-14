import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function MovieDetails({ movie, directors, baseUrl, imdbBaseUrl }) {
  return (
    <Jumbotron className="bg-white">
      <Row noGutters style={{ width: '100%' }}>
        <Col md={4}>
          <Card.Img
            src={`${baseUrl}w780${movie.poster_path}`}
            alt="poster"
            style={{ maxHeight: '100%' }}
          />
        </Col>
        <Col md={8}>
          <Card className="bg-transparent border-0">
            <Card.Body>
              <Card.Title>{movie.title}</Card.Title>
              <Card.Text>{movie.tagline}</Card.Text>
              {directors.map((director) => (
                <Card.Text>{director.name}</Card.Text>
              ))}
              <Card.Subtitle>{movie.runtime}</Card.Subtitle>
              <Card.Subtitle>{movie.vote_average}</Card.Subtitle>
              <Card.Subtitle>{movie.original_language}</Card.Subtitle>
              {movie.genres.map((genre) => (
                <Card.Subtitle key={genre.id}>{genre.name}</Card.Subtitle>
              ))}
              <Card.Text>{movie.overview}</Card.Text>
              {movie.imdb_id && (
                <Button variant="warning" href={`${imdbBaseUrl}${movie.imdb_id}`} target="_blank">
                  IMDB
                </Button>
              )}
              {movie.homepage && (
                <Button variant="info" href={movie.homepage} target="_blank">
                  Homepage
                </Button>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Jumbotron>
  );
}

export default MovieDetails;
