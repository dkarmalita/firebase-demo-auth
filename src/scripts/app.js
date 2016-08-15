// 
// AUTH DEMO APP
// 
"use strict"

var todoApp = angular.module('AuthApp', []);


todoApp.controller('AuthCtrl', ['$scope',
    function($scope) {

        $scope.headline = 'Authentification demo using AngularJS and pure Firebase API';

        $scope.user = {
            email: 'email@domain.com',
            password: 'password'
        }        

        $scope.login = {
            msg: 'No user is logged in',
            style: "alert alert-info",
            // alert-success - green
            // alert-info - blue
            // alert-warning - yellow
            // alert-danger - red
            status: false
        };
        
        // CONFIGURE FIREBASE ACCESS
        // 
        // 1. Create your free Firebase project at http://console.firebase.google.com
        // 2. Replace the object bellow with the one obteined from access snippet of your project
         var config = {
            apiKey: "apiKey",
            authDomain: "projectId.firebaseapp.com",
            databaseURL: "https://databaseName.firebaseio.com",
            storageBucket: "bucket.appspot.com",
        };

        // INITIALIZE FIREBASE API
        try{
            firebase.initializeApp(config);
        }catch(error) {
            console.error('firebase.initializeApp (',error.code,"): ",error.message);
        };

        // SET AUTHENTIFICATION WATCHER
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                var msg = 'A USER IS SIGNED IN';
                if (user.isAnonymous) {
                    msg += ' ANONYMOUSLY';
                }
                $scope.login.msg = msg;
                $scope.login.status = true;
                $scope.login.style = "alert alert-success";
            } else {
                $scope.login.msg = 'NO USER IS SIGNED IN';
                $scope.login.status = false;
                $scope.login.style = "alert alert-info";
           }
            $scope.$apply();
        })

        // LOGOUT
        $scope.logout = function(){
            firebase.auth().signOut().then(function() {
              console.log('The user is signed out');
            }, function(error) {
              alert('Error of sogning out '+error);
            }); 
        }

        // EMAIL/PASSWORD USER CREATION
        $scope.createEmailUser = function(email, password){
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(function() {
                alert('Account created');
            })
            .catch(function(error) {
                alert('Unable to create user for '+email+':'+password+"\n"+error);
            });            
        }

        // LOGIN WITH EMAIL/PASSWORD
        $scope.loginWithEmail = function(email,password){
            firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function(result) {
                console.log(result.email,result.isAnonymous);
                alert('User is logged in:\n'+result.email);
            }).catch(function(error) {
                alert('Authentification failed.\n'+error);
            });
        };

        // ANONYMOUS LOGIN
        $scope.loginAnonymously = function(){
            firebase.auth().signInAnonymously()
            .then(function(result) {
                console.log('User is logged in anonymously',result);
                alert('User is logged in anonymously');
            }).catch(function(error) {
                alert('Authentification failed.\n'+error);
            });
        }

        // LOGIN WITH GOOGLE (POPUP)
        // Apps connected to your account:
        // https://security.google.com/settings/security/permissions?pli=1
        $scope.loginWithGoogle = function(){

            var provider = new firebase.auth.GoogleAuthProvider();

            //firebase.auth().signInWithRedirect(provider).then(function(result) {
            firebase.auth().signInWithPopup(provider).then(function(result) {
                alert('User is logged in with Google');
               // This gives you a Google Access Token. You can use it to access the Google API.
                console.log('Token',result.credential.accessToken);
                // The signed-in user info.
                console.log('User',result.user);
                // ...
            }).catch(function(error) {
                console.log('Authentification failed with',error);
            });
        }

    }]);


