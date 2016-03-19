'use strict';

angular.module('nadWeb')
  .factory('User', function Auth($http, $q, Restangular, $rootScope) {
    return {
      load: function () {
        var deferred = $q.defer();
        Restangular.all('/users/me/').get('')
          .then(function (res) {
            var user = angular.copy(res);
            if (user.avatar == undefined) {
              user.avatar = 'user-example.jpg';
            }
            $rootScope.user = user;
            deferred.resolve(user);
          }, function (err) {
            deferred.reject(err);
          });
        return deferred.promise;
      }
    };
  });
