import firebase from 'firebase';

// Copy and paste this into your JavaScript code to initialize the Firebase SDK.
// You will also need to load the Firebase SDK.
// See https://firebase.google.com/docs/web/setup for more details.

firebase.initializeApp({
  'apiKey': 'AIzaSyApNs6LL_GhmyY4bvB3t4shM1PAl1Noe10',
  'databaseURL': 'https://theminimalisticwall-prod.firebaseio.com',
  'storageBucket': 'theminimalisticwall-prod.appspot.com',
  'authDomain': 'theminimalisticwall-prod.firebaseapp.com',
  'messagingSenderId': '296267784878',
  'projectId': 'theminimalisticwall-prod',
});

if (window && process.env.NODE_ENV === 'development') {
  window.firebase = firebase;
}