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
      })
      .state('doctors.add', {
        url: '/add',
        templateUrl: 'app/doctors/edit/edit.html',
        controller: 'DoctorsAddController',
        controllerAs: 'vm'
      })
      .state('doctors.edit', {
        url: '/edit/:id',
        templateUrl: 'app/doctors/edit/edit.html',
        controller: 'DoctorsEditController',
        controllerAs: 'vm'
      })
      .state('doctors.show', {
        url: '/show/:id',
        templateUrl: 'app/doctors/show/show.html',
        controller: 'DoctorsShowController',
        controllerAs: 'vm'
      });
  }

})();
