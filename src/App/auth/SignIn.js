import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {
  signIn as signInAction,
  clearAuthError as clearAuthErrorAction,
} from '../actions/authActions';

function SignIn({ auth, authError, signIn, clearAuthError }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    signIn({ email, password });
  }

  useEffect(() => {
    return () => {
      clearAuthError();
    };
  }, [clearAuthError]);

  if (auth.uid) return <Redirect to="/" />;

  return (
    <>
      <h1>Sign In</h1>
      <Form onSubmit={handleSubmit} className="mt-3">
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign In
        </Button>
        {authError && <p>{authError}</p>}
      </Form>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = {
  signIn: signInAction,
  clearAuthError: clearAuthErrorAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
