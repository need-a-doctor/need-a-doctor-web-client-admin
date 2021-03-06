'use strict';

angular.module('nadWeb')
  .factory('Auth', function Auth($location, $rootScope, Restangular, User, $cookieStore, $q, $timeout, $state) {
    var currentUser = {};

    return {
      login: function (user) {
        var deferred = $q.defer();

        Restangular.all('auth/local').post({
            'email': user.email,
            'password': user.password
          })
          .then(function (data) {
            $cookieStore.put('token', data.token);
            var headers = Restangular.defaultHeaders;
            headers.Authorization = 'Bearer ' + data.token;
            Restangular.setDefaultHeaders(headers);
            User.load().then(function (user) {
              currentUser = user;
              deferred.resolve(currentUser);
            }, function () {
              deferred.reject();
              $state.go('home');
            });
          }, function (err) {
            this.logout();
            deferred.reject(err);
          }.bind(this));

        return deferred.promise;
      },

      logout: function () {
        $cookieStore.remove('token');
        currentUser = {};
        var headers = Restangular.defaultHeaders;
        delete headers.Authorization;
        Restangular.setDefaultHeaders(headers);
        $rootScope.currentUserRole = window.localStorage.role;
        $state.go('login');
      },
      //
      // getCurrentUser: function () {
      //   return currentUser;
      // },
      isLoggedIn: function () {
        return $cookieStore.get('token') !== undefined;
      }
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
