import React from 'react';
import { Link, NavLink, Route, Redirect } from 'react-router-dom';

import {isAuthenticated} from '../firebase/auth';

export const PrivateLink = (props) => (
  isAuthenticated()
    ? <Link {...props} />
    : null
);

export const PrivateNavLink = (props) => (
  isAuthenticated()
    ? <NavLink {...props} />
    : null
);

export const PrivateRoute = (props) => (
  isAuthenticated()
    ? <Route {...props} />
    : <Redirect to={{pathname: '/login', state: {from: props.location}}} />
);