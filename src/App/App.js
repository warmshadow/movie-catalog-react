import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import { setConfig as setConfigAction } from './actions';
import NavigationBar from './nav/NavigationBar';
import Home from './pages/Home';
import Search from './pages/Search';
import './App.css';

function App({ config, setConfig }) {
  useEffect(() => {
    setConfig();
  }, [setConfig]);

  if (config.isPending)
    return (
      <Container
        align="center"
        style={{
          height: 'calc(100vh - 70px)',
        }}
        className="d-flex align-items-center justify-content-center"
      >
        <Spinner animation="border" />
      </Container>
    );

  return (
    <Container align="center">
      <BrowserRouter>
        <NavigationBar />
        <Switch>
          <Route exact path="/" render={() => <Redirect to="home" />} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/search/:title" component={Search} />
          <Route render={() => <div>PAGE NOT FOUND</div>} />
        </Switch>
      </BrowserRouter>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    config: state.config,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setConfig: () => dispatch(setConfigAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
