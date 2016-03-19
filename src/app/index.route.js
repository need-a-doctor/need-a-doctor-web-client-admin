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
          userCheck: function (User) {
            return User.load();
          }
        }
      });

    $urlRouterProvider.otherwise('/');
  }

})();
