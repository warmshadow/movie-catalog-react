import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

function CreateList({ createList }) {
  const [name, setName] = useState('');

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createList({ name });
    setName('');
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Row className="justify-content-center">
        <Form.Group controlId="title" className="col-md-4">
          <Form.Label>New list</Form.Label>
          <Form.Control type="text" value={name} placeholder="Title" onChange={handleChange} />
        </Form.Group>
      </Row>
      <Button variant="primary" type="submit">
        Create List
      </Button>
    </Form>
  );
}

export default CreateList;
