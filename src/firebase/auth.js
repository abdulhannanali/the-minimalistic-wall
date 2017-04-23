import { auth } from 'firebase';

const defaultAuth = auth();

export function onAuthStateChanged (callback) {
  return defaultAuth.onAuthStateChanged(callback)
}

function googleProvider() {
  return new auth.GoogleAuthProvider();
}

function githubProvider () {
  return new auth.GithubAuthProvider();
}

/**
 * Helper function to sign in with either popup or redirect
 * 
 * Supported Provider Types:
 *  - google
 *  - github
 * 
 * Support Sign In Type:
 *  - popup
 *  - redirect
 */
export function signIn (providerType, signInType='popup') {
  let provider;
  
  if (providerType === 'google') {
    provider = googleProvider();
  } else if (providerType === 'github') {
    provider = githubProvider();
  } else {
    throw new Error('Unknown/Unsupported provider : ' + providerType);
  }

  if (!!providerType || providerType === 'popup') {
    return defaultAuth.signInWithPopup(provider);
  } else if (providerType === 'redirect') {
    return defaultAuth.signInWithRedirect(provider);
  }
}

export function signOut () {
  return defaultAuth.signOut();
}

export function isAuthenticated () {
  return defaultAuth.currentUser !== null;
}