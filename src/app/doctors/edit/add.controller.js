(function () {
  'use strict';

  angular
    .module('nadWeb')
    .controller('DoctorsAddController', DoctorsAddController);

  /** @ngInject */
  function DoctorsAddController($stateParams) {
    var vm = this;

    activate();

    function activate() {
      alert($stateParams.id)
    }
  }

})();
