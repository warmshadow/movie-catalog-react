import React from 'react';
import { connect } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';

function NavigationBar({ auth }) {
  return (
    <Navbar bg="dark" variant="dark" fixed="top">
      <Link to="/">
        <Navbar.Brand>Movie Catalog</Navbar.Brand>
      </Link>
      <SearchBar />
      {auth.uid ? <SignedInLinks /> : <SignedOutLinks />}
    </Navbar>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(NavigationBar);
