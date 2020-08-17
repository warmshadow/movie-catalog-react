import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function SignedOutLinks({ handleCollapse }) {
  return (
    <Nav className="mr-auto">
      <NavLink to="/signin" onClick={handleCollapse}>
        <Button className="nav-link">Sign In</Button>
      </NavLink>
      <NavLink to="/signup" onClick={handleCollapse}>
        <Button className="nav-link">Sign Up</Button>
      </NavLink>
    </Nav>
  );
}

export default SignedOutLinks;
