Auth State in App.js is for the time when application is loaded 
for the first time and we need the state if the user had been already authenticated
or not. AuthState can help us in these use cases.

Should be initialized very first time. For the authentication state in other cases,
we are going to use Popout and Login state is going to be managed there instead of in the Root,
App.js component. This state is definitely important cos, our NavBar and routes rely on this
state for being displayed.

Any where within the application if we need to change the data we can call the methods
provided by the Authentication and it'll in result onAuthStateChanged.

