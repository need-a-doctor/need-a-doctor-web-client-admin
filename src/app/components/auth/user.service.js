'use strict';

angular.module('nadWeb')
  .factory('User', function Auth($http, $q/*, $translate*/) {
    return {
      get: function () {
        var deferred = $q.defer();
        $http.get('/users/me').then(function (res) {
          var user = res.data;
          // if (user.lang) {
          //   $translate.use(user.lang);
          // }
          deferred.resolve(user);
        }).catch(function (err) {
          deferred.reject(err);
        });
        return deferred.promise;
      }
    };
  });
