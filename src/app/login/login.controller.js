(function () {
  'use strict';

  angular
    .module('nadWeb')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController(Auth, $location) {
    var vm = this;
    vm.user = {};

    vm.login = function (/*form*/) {
      // vm.form.email.$dirty = true;
      // vm.form.password.$dirty = true;
      // vm.errors = null;

      // if (form.$valid) {
        Auth.login(vm.user)
          .then(function () {
            $location.path('/');
          }, function (/*res*/) {
            // vm.errors = res.message;
          });
      // }
    };

    activate();

    function activate() {
    }

  }
})();
