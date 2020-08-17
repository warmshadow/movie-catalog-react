import React from 'react';
import { connect } from 'react-redux';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { signOut as signOutAction } from '../actions/authActions';

function SignedInLinks({ handleCollapse, signOut }) {
  return (
    <Nav className="mr-auto">
      <NavLink to="/lists" onClick={handleCollapse}>
        <Button className="nav-link">My Lists</Button>
      </NavLink>
      <Button
        className="nav-link"
        onClick={() => {
          signOut();
          handleCollapse();
        }}
      >
        Log Out
      </Button>
    </Nav>
  );
}

const mapDispatchToProps = {
  signOut: signOutAction,
};

export default connect(null, mapDispatchToProps)(SignedInLinks);
