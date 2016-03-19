(function () {
  'use strict';

  angular
    .module('nadWeb')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(Auth) {
    var vm = this;

    activate();

    vm.logout = function () {
      Auth.logout();
    };

    function activate() {
      $(window).resize();
    }

  }
})();
