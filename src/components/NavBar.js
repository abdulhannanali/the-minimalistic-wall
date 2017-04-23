/**
 * NavBar.js
 * NavBar to be shown at the 
 */
import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import firebase from 'firebase';

export default class NavBar extends Component {
  render() {
    let profileLink, settingsLink;
    const { authenticated } = this.props;
    const authenticationLink = (
      !authenticated
      ? <Link to="/login">Login</Link>
      : <Link to="/logout" state={{ ui: true }}>Logout</Link>
    );

    if (authenticated && firebase.auth().currentUser) {
      let userLink = '/profile/' + firebase.auth().currentUser.uid;
      let link = '/settings/' + firebase.auth().currentUser.uid;

      profileLink = (
        <li><Link to={userLink}>My Profile</Link></li>
      );

      settingsLink = (
        <li><Link to={link}>Settings</Link></li>
      );
    }


    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">The Minimalistic Wall</Link>
          </div>
          <ul className="nav navbar-nav">
            <li><NavLink activeClassName="active" to="/feed">Feed</NavLink></li>
            <li className="active"><NavLink to="/post">Post a Status!</NavLink></li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            {profileLink}
            {settingsLink}
            <li>{authenticationLink}</li>
          </ul>
        </div>
      </nav>
    );
  }
}
