import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from './layouts/Home/Home';
import ViewCard from './layouts/ViewCard/ViewCard';
import NotFound from './layouts/NotFound';

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Redirect to="/memes" />
          </Route>
          <Route exact path="/memes" component={Home} />
          <Route path="/meme/:id" component={ViewCard} />
          <Route path="/404" component={NotFound} />
          <Route path="*">
            <Redirect to="/404" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
