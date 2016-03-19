'use strict';

angular.module('nadWeb')
  .factory('User', function Auth($http, $q, Restangular, $rootScope) {
    return {
      get: function () {
        var deferred = $q.defer();
        Restangular.all('/users/me/').get('').then(function (res) {
          var user = res.data;
          $rootScope.user = user;
          deferred.resolve(user);
        }).catch(function (err) {
          deferred.reject(err);
        });
        return deferred.promise;
      }
    };
  });
