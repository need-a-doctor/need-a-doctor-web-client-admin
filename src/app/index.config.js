(function () {
  'use strict';

  angular
    .module('nadWeb')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig, RestangularProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    RestangularProvider.setBaseUrl('50.112.191.195:9000/api');

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;
  }

})();
