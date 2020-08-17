import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function SignedOutLinks() {
  return (
    <Nav className="ml-auto">
      <NavLink to="/signin">
        <Button variant="link">Sign In</Button>
      </NavLink>
      <NavLink to="/signup">
        <Button variant="link">Sign Up</Button>
      </NavLink>
    </Nav>
  );
}

export default SignedOutLinks;
