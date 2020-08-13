import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function SearchBar() {
  const [value, setValue] = useState('');

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleSearch(e) {
    e.preventDefault();
    console.log(value);
  }

  return (
    <Form inline onSubmit={handleSearch} className="ml-auto">
      <Form.Control
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Movie title.."
        className="mr-sm-2"
      />
      <Button variant="outline-light" type="submit">
        Search
      </Button>
    </Form>
  );
}

export default SearchBar;
