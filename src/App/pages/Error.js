import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearError as clearErrorAction } from '../actions';

function Error({ error, clearError }) {
  useEffect(() => {
    return () => clearError();
  }, [clearError]);

  if (!error) return <Redirect to="/" />;

  const errorMessage = error.status_message || error.code;

  return (
    <div>
      <h3 className="font-italic pt-5 pb-5">Something went wrong..</h3>
      {errorMessage && <h4>{errorMessage}</h4>}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    error: state.error,
  };
};

const mapDispatchToProps = {
  clearError: clearErrorAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Error);
