(function () {
  'use strict';

  angular
    .module('nadWeb')
    .config(config)
    .factory('myHttpInterceptor', function ($injector, $q) {
      return {
        'responseError': function (rejection) {
          if (rejection.status == 401) {
            var Auth = $injector.get('Auth');
            Auth.logout();
            return $q.reject(rejection);
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

    RestangularProvider.setBaseUrl('http://50.112.191.195:9000/api/');

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
