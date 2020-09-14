import React, { useEffect } from 'react';
import { useHistory, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import { setConfig as setConfigAction } from './actions';
import NavigationBar from './nav/NavigationBar';
import Home from './pages/Home';
import Category from './pages/Category';
import Search from './pages/Search';
import Movie from './pages/Movie';
import Lists from './pages/Lists';
import List from './pages/List';
import Ratings from './pages/Ratings';
import Watchlist from './pages/Watchlist';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import Error from './pages/Error';
import NotFound from './pages/NotFound';
import './App.css';
import { ConfirmationModalContextProvider } from './components/ConfirmationModalContext';
import { PaginationContextProvider } from './context/PaginationContext';

function App({ config, setConfig, error }) {
  useEffect(() => {
    setConfig();
  }, [setConfig]);

  const history = useHistory();

  if (error) {
    history.push('/error');
  }

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
      <NavigationBar />
      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path={['/category/:title', '/category/:title/:pageNum']}>
          <Category />
        </Route>
        <Route exact path={['/search/:title', '/search/:title/:pageNum']}>
          <Search />
        </Route>
        <Route exact path={['/movie/:id', '/movie/:id/:pageNum']}>
          <Movie />
        </Route>
        <Route exact path="/lists">
          <ConfirmationModalContextProvider>
            <Lists />
          </ConfirmationModalContextProvider>
        </Route>
        <Route exact path="/lists/:id">
          <ConfirmationModalContextProvider>
            <List />
          </ConfirmationModalContextProvider>
        </Route>
        <Route exact path="/ratings/:id">
          <ConfirmationModalContextProvider>
            <PaginationContextProvider>
              <Ratings />
            </PaginationContextProvider>
          </ConfirmationModalContextProvider>
        </Route>
        <Route exact path="/watchlist/:id">
          <ConfirmationModalContextProvider>
            <PaginationContextProvider>
              <Watchlist />
            </PaginationContextProvider>
          </ConfirmationModalContextProvider>
        </Route>
        <Route exact path="/signin">
          <SignIn />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/error">
          <Error />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    config: state.config,
    error: state.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setConfig: () => dispatch(setConfigAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
