(function () {
  'use strict';

  angular
    .module('nadWeb')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main',
        resolve: {
          userCheck: function (User, $state, $q) {
            var defered = $q.defer();
            User.get().then(function (res) {
              defered.resolve(res);
            }, function (err) {
              $state.go('login');
              defered.reject(err);
            });
            return defered.promise;
          }
        }
      });

    $urlRouterProvider.otherwise('/');
  }

})();
