import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

function CreateList({ createList }) {
  const [state, setState] = useState({ name: '', error: '' });
  const { name, error } = state;

  const handleChange = (e) => {
    setState({ ...state, name: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setState({ ...state, error: 'Name cannot be empty!' });
    } else {
      createList({ name });
      setState({ name: '', error: '' });
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Row className="justify-content-center">
        <Form.Group controlId="title" className="col-md-4">
          <Form.Label>New list</Form.Label>
          <Form.Control type="text" value={name} placeholder="Name" onChange={handleChange} />
        </Form.Group>
      </Row>
      <Button variant="primary" type="submit" className="mb-4">
        Create List
      </Button>
      {error && <div className="text-danger">{error}</div>}
    </Form>
  );
}

export default CreateList;
