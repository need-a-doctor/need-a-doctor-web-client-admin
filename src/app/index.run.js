(function() {
  'use strict';

  angular
    .module('wtdAdmin')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
