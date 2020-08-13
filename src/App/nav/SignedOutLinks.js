import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';

function SignedOutLinks() {
  return (
    <Nav className="ml-auto">
      <NavLink to="/signin">Sign In</NavLink>
      <NavLink to="/signup">Sign Up</NavLink>
    </Nav>
  );
}

export default SignedOutLinks;
