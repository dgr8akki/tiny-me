import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from './HomePage';
import CallbackPage from './CallbackPage';

class Pages extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/:id" component={CallbackPage} />
        </div>
      </Router>
    )
  }
}

export default Pages;
