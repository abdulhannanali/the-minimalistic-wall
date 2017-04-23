import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

import {signIn} from '../firebase/auth';
import Loader from './Loader';
import ErrorAlert from './Alerts/Error';

const loginStyle = {
  textAlign: 'center',
  height: '100%',
  verticalAlign: 'middle',
  margin: '30px',
};

const buttonsStyle = {
  margin: '30px',
};

const DEFAULT_REDIRECT = { pathname: '/feed' };

export default class Login extends Component {
  state = {
    error: false,
    loading: false,
    redirectToReferrer: false,
  }
  
  onClick(type, event) {
    event.preventDefault();
    this.setState({ loading: true, error: false });
    signIn(type, 'popup')
      .then(this.handleSignIn.bind(this))
      .catch(this.handleError.bind(this));
  }

  handleSignIn(method) {
    this.setState({ loading: false, loggedIn: true });
  }

  handleError(error) {
    this.setState({ loading: false });
    this.setError(error);
  }

  setError(error) {
    if (error.code === 'auth/network-request-failed') {
      this.setState({
        error: { message: 'Oops! Check your internet connection, and then try again!!!' },
      });
    } else if (error.code === 'auth/account-exists-with-different-credential') {
      this.setState({
        error: { message: 'Another account already exists with the email "' + error.email + '"'},
      });
    } else {
      this.setState({
        error: { message: 'Ooopsy! A very unexpected error occured! Pls report it!'},
      });
    }
  }

  isReferrer(location) {
    return location.state && location.state.from;
  }

  /**
   * Welcome message changes based on the location to make the user
   * feel more relevant and to the point whenever they come here
   */
  welcomeMessage(location) {
    return this.isReferrer(location)
      ? 'Login to explore the page at ' + location.state.from
      : 'You\'re one step closer to explore this wall';
  }

  redirect(location) {
    const { from: referrer } = location.state || {from: DEFAULT_REDIRECT};
    return (
      <Redirect to={referrer} state={{ loggedIn: true }} />
    );
  }

  render() {
    const {error, loading, redirectToReferrer} = this.state;
    const {location} = this.props;

    if (loading) {
      return (<LoggingMessage />);
    }

    if (redirectToReferrer) {
      return this.redirect(location);
    }

    return (
      <div style={loginStyle}>
        <ErrorAlert error={error} />
        <div className="LoginMessage">
          <h1>Login</h1>
          <h2>{this.welcomeMessage(location)}</h2>
        </div>
        <div className="LoginButtons" style={buttonsStyle}>
          <GoogleLoginButton onClick={this.onClick.bind(this, 'google')} /> 
          <h3>Or</h3>
          <GithubLoginButton onClick={this.onClick.bind(this, 'github')} />     
        </div>
      </div>
    );
  }
}

const GoogleLoginButton = ({ onClick }) => {
  return (
    <button className="btn btn-default btn-lg btn-success" onClick={onClick}>
      Sign In With Google
    </button>
  );
};

const GithubLoginButton = ({ onClick }) => (
  <button className="btn btn-default btn-primary" onClick={onClick}>
    Sign In With Github
  </button>
);


const LoggingMessage = () => {
  return (
    <div className="LoggingIn" style={loginStyle}>
      <h3>Please wait, while we log you in</h3>
      <div style={{marginTop: '80px'}}><Loader /></div>
    </div>
  );
};

