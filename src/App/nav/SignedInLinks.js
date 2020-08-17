import React from 'react';
import { connect } from 'react-redux';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { signOut as signOutAction } from '../actions/authActions';

function SignedInLinks({ profile, signOut }) {
  const { firstName, lastName } = profile;
  return (
    <Nav className="ml-auto">
      <NavLink to="/">
        <Button variant="link">My Lists</Button>
      </NavLink>
      <Button variant="link" onClick={signOut}>
        Log Out
      </Button>
      <NavLink to="/">
        <Button variant="link">{`${firstName} ${lastName}`}</Button>
      </NavLink>
    </Nav>
  );
}

const mapDispatchToProps = {
  signOut: signOutAction,
};

export default connect(null, mapDispatchToProps)(SignedInLinks);
