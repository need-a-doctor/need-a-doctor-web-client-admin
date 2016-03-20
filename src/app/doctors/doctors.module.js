(function () {
  'use strict';

  angular
    .module('nadWeb')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('doctors', {
        url: '/doctors',
        templateUrl: 'app/common/standard.html',
        abstract: true,
        resolve: {
          userCheck: function (User) {
            return User.load();
          }
        }
      })
      .state('doctors.list', {
        url: '/',
        templateUrl: 'app/doctors/list/list.html',
        controller: 'DoctorsListController',
        controllerAs: 'vm'
      });
  }

})();
