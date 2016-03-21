(function () {
  'use strict';

  angular
    .module('nadWeb')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope, $cookieStore, Restangular) {
    $rootScope.$on('$stateChangeStart',
      function () {
        $.each([0, 10, 100, 500, 1000, 2000, 5000], function (i, v) {
          setTimeout('$(window).resize()', v);
        });
      });
    $rootScope.$on('$stateChangeSuccess',
      function (event, toState) {
        if (toState.name == 'login') {
          $('body').addClass('login-body');
        } else {
          $('body').removeClass('login-body');
        }
      });


    var headers = Restangular.defaultHeaders;
    headers.Authorization = 'Bearer ' + $cookieStore.get('token');
    Restangular.setDefaultHeaders(headers);

    Restangular.all('/users/me/clinic').get('')
      .then(function (res) {
        $rootScope.clinic = res;
      });

    $log.debug('runBlock end');
  }

})();
