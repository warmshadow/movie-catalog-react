# Movie Catalog

**_Ongoing project_**

Movie Catalog being developed with React using The Movie Database API and Firestore

## Run it locally

Clone the repository ->\
Create API key at [The Movie Database](https://www.themoviedb.org/documentation/api) ->\
Create _.env.local_ file in project's root folder and paste it like this:

```
REACT_APP_API=yourapikey
```

### Install

```
npm install
npm start
```

## Progress

### Done

- Fetch movies from TMDb and store in redux store
- Connected firebase to redux
- Firebase email / password authentication
- Cloud functions for creation of initial lists on user sign up
- Firestore security rules
- Firestore real-time listeners with redux-firestore / react-redux-firebase
- Functionality for creating lists, adding movies and setting ratings
- Toastr notifications
- Firestore data pagination (needs revision)

### To Do

- Sorting options
- TMDb guest session
- Browsing by genre
- OAuth Google sign-in / email verification
- Early check for existence in watchlist
- Styling, transitions
- firestoreConnect HOC -> useFirestoreConnect hook
- Change redirects implementation to use redux-firebase
- Refactor duplications

## Building With

- React
- Redux
- Redux Thunk
- Firebase
- React Redux Firebase
- Redux Firestore
- React Bootstrap
- Bootswatch
