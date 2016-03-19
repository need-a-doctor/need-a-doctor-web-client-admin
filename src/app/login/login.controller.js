(function () {
  'use strict';

  angular
    .module('nadWeb')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController(Auth, $location) {
    var vm = this;
    vm.user = {};

    vm.login = function (form) {
      vm.form.user_name.$dirty = true;
      vm.form.password.$dirty = true;
      vm.errors = null;

      if (form.$valid) {
        Auth.login({
            user_name: vm.user.user_name,
            password: vm.user.password
          })
          .then(function () {
            $location.path('/');
          }, function (/*res*/) {
            // vm.errors = res.message;
          });
      } 
    };

    activate();

    function activate() {
    }

  }
})();
