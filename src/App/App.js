import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import NavigationBar from './nav/NavigationBar';
import Home from './pages/Home';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavigationBar />
        <Switch>
          <Route exact path="/" render={() => <Redirect to="home" />} />
          <Route exact path="/home" component={Home} />
          <Route render={() => <div>PAGE NOT FOUND</div>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
