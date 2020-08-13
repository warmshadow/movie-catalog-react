import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';

function SignedInLinks() {
  return (
    <Nav className="ml-auto">
      <NavLink to="/">My Lists</NavLink>
      <NavLink to="/">Log Out</NavLink>
      <NavLink to="/">KL</NavLink>
    </Nav>
  );
}

export default SignedInLinks;
