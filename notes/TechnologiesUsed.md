# Technologies used in application

The technologies used in this application are going to be the ones 
that we have already been using in our daily life too. However, the basic stack would 
exist in:

- React
- React Router (For routing purposes, learned this for developing this application)
- Firebase SDK (Sufficient for developing with React)

I think this will be sufficient as our main focus for this application is to learn Firebase and managing the data structure with it. We can leave the other technologies for later.

Spicing things up:
- Add Jest Testing for our Componentns
- Use Jest to test our functions
- Always have a continuous integration system, CircleCI for this application

Use Es6 for development and add more things to this stack, only if necessary
otherwise it's already pretty complete and doesn't need more stuff to be included within
this application.

The components are going to be stateful and many times whenever we need a state we are just
going to use Firebase within the components to load data from different parts of the firebase, instead of using Redux for this purpose. 

So Firebase is the Model and Controller within our Application and directly talks with out View Layer in React. State is managed within Firebase and is propogated through React's Stateful Components. We can still have Stateless components for the presentational layer.

Authentication Listeners can be called at Root level to propagate any changes and distinctions between Private and Public Routes isn't very hard to make for us.