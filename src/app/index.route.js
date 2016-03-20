(function () {
  'use strict';

  angular
    .module('nadWeb')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($urlRouterProvider) {
    $urlRouterProvider.otherwise('/doctors/');
  }

})();
