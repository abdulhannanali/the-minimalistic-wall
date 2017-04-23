## Structuring Data

While structuring data within the firebase one major thing we have to keep in mind
is data fanning out. Fanning out the data can let us perform time taking operations on 
the server side without very much processing as there is data duplication involved.

The most important thing here is user, and how we access it. In order to make use 
of data fanning out. There's going to be a users property containing information about
all the users as follows.

(Users here contain data that don't have any two way relationship)
(What we'd like here is to fetch user information without fetching all
the followers when we do it. As the followers can be sometimes in millions too)

- users
    - userid1 (unique identification)
        - displayName
        - email
        - authenticationMethod (Method through which we authentication)
        - ...Othersettings (different settings we)
    - userid2 (Only 1 level deep to keep data structure as flattened as possible)
        - displayName
        - email
        - authenticationMethod
        - ...Othersettings

- followers
    - userid1 (uid)
        - computistic: Fireabse Timestamp
        - ...keys of the unique id of the users
    - userid2 (uid)
        - computistic (they both follow each other)

Check if ${userId2} follows ${userId} 
`/followers/${userId}/${userId2}`.exists()

Follow each other relation is easy to derive and doesn't take many calls.
Just two calls.
Afterwards we can easily limit the number of followers, we want to subscribe
to  within list and check if the new followers are coming in or not.

`/followers/${userId}/${userId2}`.exists()
`/followers/${userId2}/${userId}`.exists()

This can be further simplified too by especially establishing a relation at follow
time to decrease the amount of data fetched, but that's a todo. As following functionality
is something not on top of our list.

Indexes: 'createdAt, key, likesCount', the performance will be better
when we add a database rule to index it on the server side

- status (Sensitive piece of data, accurate data permissions are necessary)
    - status1
        - type (defaults to text)
        - createdAt (Firebase Timestamp)
        - text
        - likesCount  (number of likes)
        - uid (unique identification of the user)
    - status2
        - type (defaults to text)
        - createdAt (Firebase Timestamp)
        - text
        - likesCount (number of likes)
        - uid (unique identification)
    - status3
        - type (defualts to text)
        - createdAt (Firebase Timestamp)
        - text (contains text information)
        - likesCount
        - uid (unique identification of the user)


Separated so we only need to load all likers only when we need them.

- likes (stores the statuses liked by each user)
    - status2 (contains all the likers nested)
        - computistic: (Firebase Timestamp of the time, it's created)
        - ....otherUsers

We have to keep the structure flat, otherwise all the likes will be loaded
when we only want to load the status, resulting in a huge amount of data loading
we don't need.

How are we going to access likes?
    - Likes are going to be accessed by this simple format
        - /likes/{statusid}/{userid} (if it exists the status is liked)
    
