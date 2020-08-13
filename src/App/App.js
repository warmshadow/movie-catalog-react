import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import NavigationBar from './nav/NavigationBar';
import Home from './pages/Home';
import Search from './pages/Search';
import './App.css';

function App() {
  return (
    <Container className="App">
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

export default App;
