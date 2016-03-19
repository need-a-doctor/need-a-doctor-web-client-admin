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
          auth: function (Auth, $state, $q,$timeout) {
            var defered = $q.defer();
            $timeout(function () {
              if (Auth.isLoggedIn()) {
                defered.resolve(true);
              } else {
                defered.reject();
                $state.go('login');
              }
            });
            return defered.promise;
          }
        }
      });

    $urlRouterProvider.otherwise('/');
  }

})();
