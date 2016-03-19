'use strict';

angular.module('nadWeb')
  .factory('Auth', function Auth($location, $rootScope, $http, User, $cookieStore, $q, $timeout, $state) {
    var currentUser = {};

    return {
      login: function (user) {
        var deferred = $q.defer();

        $http.post('/api/auth/', {
            user_name: user.user_name,
            password: user.password
          })
          .success(function (data) {
            $cookieStore.put('token', data.token);
            User.get().then(function (user) {
              currentUser = user;
              deferred.resolve(currentUser);
            }).catch(function () {
              deferred.reject();
              $state.go('root.login');
            });
          })
          .error(function (err) {
            this.logout();
            deferred.reject(err);
          }.bind(this));

        return deferred.promise;
      },

      logout: function () {
        $cookieStore.remove('token');
        currentUser = {};
        $location.path('/login');
      }//,

      // getCurrentUser: function () {
      //   return currentUser;
      // },
      // isLoggedIn: function () {
      //   return currentUser.hasOwnProperty('role');
      // },
      //
      //
      // reloadUser: function () {
      //   User.get().then(function (user) {
      //     currentUser = user;
      //   })
      // },
      //
      // tryDefineUser: function () {
      //   var deferred = $q.defer();
      //   $timeout(function () {
      //     if (currentUser.hasOwnProperty('role')) {
      //       deferred.resolve();
      //     } else {
      //       if ($cookieStore.get('token')) {
      //         User.get().then(function (user) {
      //           currentUser = user;
      //           deferred.resolve();
      //         }).catch(function () {
      //           deferred.reject();
      //           $state.go('root.login');
      //         });
      //       } else {
      //         deferred.reject();
      //         $state.go('root.login');
      //       }
      //     }
      //   });
      //   return deferred.promise;
      // }
    };
  });
