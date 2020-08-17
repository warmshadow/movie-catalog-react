import React, { useState } from 'react';
import { connect } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';

function NavigationBar({ auth, profile }) {
  const [expanded, setExpanded] = useState(false);

  const handleCollapse = () => {
    setExpanded(false);
  };

  const { firstName, lastName } = profile;
  return (
    <Navbar
      expanded={expanded}
      expand="lg"
      bg="primary"
      variant="dark"
      fixed="top"
      className="py-3"
    >
      <Navbar.Brand>
        <Link onClick={handleCollapse} to="/">
          <div className="d-flex flex-column justify-content-center align-items-center mr-3">
            <Navbar.Brand className="mr-0">Movie Catalog</Navbar.Brand>
            {firstName ? (
              <span className="text-info text-uppercase">{`${firstName} ${lastName}`}</span>
            ) : (
              <span className="text-info text-uppercase">React</span>
            )}
          </div>
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle onClick={() => setExpanded(expanded ? false : 'expanded')} />
      <Navbar.Collapse>
        {auth.uid ? (
          <SignedInLinks handleCollapse={handleCollapse} />
        ) : (
          <SignedOutLinks handleCollapse={handleCollapse} />
        )}
        <SearchBar handleCollapse={handleCollapse} />
      </Navbar.Collapse>
    </Navbar>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(NavigationBar);
