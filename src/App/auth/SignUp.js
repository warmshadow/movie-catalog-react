import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { signUp as signUpAction } from '../actions/authActions';

function SignUp({ auth, authError, signUp }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    signUp({ email, password, firstName, lastName });
  }

  if (auth.uid) return <Redirect to="/" />;

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          value={email}
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Form.Text className="text-muted">
          We will never share your email with anyone else.
        </Form.Text>
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

      <Form.Group controlId="firstName">
        <Form.Label>First name</Form.Label>
        <Form.Control
          value={firstName}
          placeholder="First name"
          onChange={(e) => setFirstName(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="lastName">
        <Form.Label>Last name</Form.Label>
        <Form.Control
          value={lastName}
          placeholder="Last name"
          onChange={(e) => setLastName(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Sign In
      </Button>
      {authError && <p>{authError}</p>}
    </Form>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
  };
};

const mapDispatchToProps = {
  signUp: signUpAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
