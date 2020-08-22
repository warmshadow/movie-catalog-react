import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function SearchBar({ handleCollapse }) {
  const [value, setValue] = useState('');
  const history = useHistory();

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (value) {
      history.push(`/search/${value}`);
      setValue('');
    }
  };

  return (
    <Form inline onSubmit={handleSearch} className="d-flex justify-content-center my-2 my-lg-0">
      <Form.Control
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Movie title.."
        className="mr-sm-2"
      />
      <Button variant="secondary" className="my-2 my-sm-0" type="submit" onClick={handleCollapse}>
        Search
      </Button>
    </Form>
  );
}

export default SearchBar;
