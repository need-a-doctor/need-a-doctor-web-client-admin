(function () {
  'use strict';

  angular
    .module('nadWeb')
    .config(config)
    .factory('myHttpInterceptor', function ($injector, $q) {
      return {
        'responseError': function (rejection) {
          if (rejection.status == 401) {
            $injector.get('Auth').logout();
          }
          return $q.reject(rejection);
        }
      };
    });


  /** @ngInject */
  function config($logProvider, toastrConfig, RestangularProvider, $httpProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Read config file BEGIN
    if (!config.env) {
      config.env = 'prod';
    }
    // Read config file END

    RestangularProvider.setBaseUrl('http://52.38.21.188:9000/api/');

    $httpProvider.interceptors.push('myHttpInterceptor');

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;
  }

})
();
