import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import URLSearch from './URLSearch';


const Routes = () => {
  return (
    <Router>
      <div>
        <nav>
          <h1>Welcome to URL Search</h1>
        </nav>
        <main>
          
        </main>
        <Switch>
          <Route exact path="/" component={URLSearch} />
          <Route render = {() => <h2>Sorry this page does not exist</h2>} />
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;
