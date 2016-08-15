
# Firebase Auth API demo application

This repository contains a demo application which shows how to use Firebase Authentification service in a web application. All of the Firebase calls implemented with pure Firebase API, without any 3rd party libraries


## Installation

1. Clone the repository
2. Run `npm install` inside the project folder
3. Connect the application to Firebase (see *"Connection to Firebase"* section below).
4. Run `npm start` into terminal and play with the demo on http://localhost:8080


## Connection to Firebase

1. Go to [Firebase Console](http://console.firebase.google.com) 
2. Create new Firebase project.
3. In the Project Overview, click **Add Firebase to your web app**.
It causes a popped up dialog within JavaScript snippet contains Firebase initialization parameters for your application. Something similar to this:

    ```html
  <script src="https://www.gstatic.com/firebasejs/3.1.0/firebase.js"></script>
  <script>
    // Initialize Firebase
    // TODO: Replace with your project's customized code snippet
    var config = {
      apiKey: "apiKey",
      authDomain: "projectId.firebaseapp.com",
      databaseURL: "https://databaseName.firebaseio.com",
      storageBucket: "bucket.appspot.com",
    };
    firebase.initializeApp(config);
  </script>
```
4. Copy the config object

    ```js
    var config = {
      apiKey: "apiKey",
      authDomain: "projectId.firebaseapp.com",
      databaseURL: "https://databaseName.firebaseio.com",
      storageBucket: "bucket.appspot.com",
    };
```
5. Open `scripts/app.js` file and replace the `config` object in it (lines 33-39) with the copied one.
6. Add `127.0.0.1` to the list of authenticated domains (see *Domain authentication* section below).


## Domain Authentification

1. In the menu of your Firebase project, select **Auth**
2. Switch to **SIGN-IN METHOD** tab
3. Scroll down to the **OAuth redirect domains
** section.
4. Press **ADD DOMAIN** button and enter the domain (`127.0.0.1`) in the popped up window.