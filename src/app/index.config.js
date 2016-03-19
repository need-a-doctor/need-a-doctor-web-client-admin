(function () {
  'use strict';

  angular
    .module('nadWeb')
    .config(config)
    .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
      return {
        request: function (config) {
          config.headers = config.headers || {};
          if ($cookieStore.get('token')) {
            config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
          }
          // if (config.url == 'https://huntsman.mobi/notify') {
          //   delete config.headers.Authorization;
          //   delete config.headers.Accept;
          //   delete config.headers['X-Requested-With'];
          // }
          return config;
        },

        // Intercept 401s and redirect you to login
        responseError: function (response) {
          if (response.status === 401) {
            $location.path('/login');
            // remove any stale tokens
            $cookieStore.remove('token');
            return $q.reject(response);
          }
          else {
            return $q.reject(response);
          }
        }
      };
    });

  /** @ngInject */
  function config($logProvider, toastrConfig, RestangularProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    RestangularProvider.setBaseUrl('http://50.112.191.195:9000/api/');

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;
  }

})();
