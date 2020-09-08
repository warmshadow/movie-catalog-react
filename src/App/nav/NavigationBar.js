import React, { useState } from 'react';
import { connect } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { signOut as signOutAction } from '../actions/authActions';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import SearchBar from '../components/SearchBar';

function NavigationBar({ auth, profile, signOut }) {
  const [expanded, setExpanded] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleCollapse = () => {
    setExpanded(false);
    if (showTooltip) setShowTooltip(false);
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
            <h6 className="text-info">{`${firstName || 'React'} ${lastName || ''}`}</h6>
          </div>
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle onClick={() => (expanded ? handleCollapse() : setExpanded('expanded'))} />
      <Navbar.Collapse>
        {auth.uid ? (
          <SignedInLinks uid={auth.uid} signOut={signOut} handleCollapse={handleCollapse} />
        ) : (
          <SignedOutLinks handleCollapse={handleCollapse} />
        )}
        <SearchBar
          handleCollapse={handleCollapse}
          showTooltip={showTooltip}
          setShowTooltip={setShowTooltip}
        />
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

const mapDispatchToProps = {
  signOut: signOutAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
