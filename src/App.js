/**
 * App.js
 * Main Entry point Component for the application
 * All the engagement and routing starts from here
 */

import React, {Component} from 'react';
import MainRouter from './routers'
import {onAuthStateChanged} from './firebase/auth'

export default class App extends Component {
  state = {
    authenticated: false,
    loading: true, // Assuming it's always going to load first when we start the application 
    user: undefined,
    isAnonymous: false
  }

  setAuthState = (user) => {
    if (user) {
      this.setState({ authenticated: true, loading: false, user })
    } else {
      this.setState({ loading: false })
    } 
  }

  componentDidMount() {
    this.authListener = onAuthStateChanged(this.setAuthState)
  }

  componentWillUnmount () {
    this.authListener();
  }

  render() {
    const { loading, authenticated } = this.state;

    return (
      <div>
        <MainRouter {...this.state} />
      </div>
    )
  }
}