(function () {
  'use strict';

  angular
    .module('nadWeb')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope) {
    $rootScope.$on('$stateChangeSuccess',
      function (event, toState) {
        if (toState.name == 'login') {
          $('body').addClass('login-body');
        } else {
          $('body').removeClass('login-body');
        }
      });

    $log.debug('runBlock end');
  }

})();
