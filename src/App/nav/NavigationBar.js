import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';

function NavigationBar() {
  return (
    <Navbar bg="dark" variant="dark" fixed="top">
      <Link to="/">
        <Navbar.Brand>Movie Catalog</Navbar.Brand>
      </Link>
      <SearchBar />
      {/* <SignedInLinks /> */}
      <SignedOutLinks />
    </Navbar>
  );
}

export default NavigationBar;
