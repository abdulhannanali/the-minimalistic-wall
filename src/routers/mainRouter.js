'use strict';

import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import {PrivateRoute} from './private';

import NavBar from '../components/NavBar';
import Login  from '../components/Login';
import Logout from '../components/Logout';
import {Status, Feed} from '../components/UserFeed';

export default class MainRouter extends Component {
  render() {
    const {authenticated, user} = this.props;

    return (
      <Router>
        <div>
          <div className="NavBar"><NavBar authenticated={authenticated} user={user}/></div>
          <div className="container-fluid contentBody">
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/logout" component={Logout} />
              <PrivateRoute path="/feed" component={Feed} />
              <PrivateRoute path="/post" component={Status} />
              <Route render={() => <h1>No match sorry!!!</h1>} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}