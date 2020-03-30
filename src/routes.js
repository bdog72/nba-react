//
//
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import Header from './components/header';
import Footer from './components/footer';
import Article from './components/Articles';
import Teams from './components/Teams';

const Routes = () => (
  <Router>
    <Header />
    <Switch>
      <Route path="/article/:id" component={Article} />
      <Route exact path="/teams" component={Teams} />
      <Route exact path="/" component={Home} />
    </Switch>
    <Footer />
  </Router>
);

export default Routes;
