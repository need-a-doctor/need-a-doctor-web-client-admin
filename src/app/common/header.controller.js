(function () {
  'use strict';

  angular
    .module('nadWeb')
    .controller('HeaderController', HeaderController);

  /** @ngInject */
  function HeaderController($scope, Auth) {
    // var main = this;

    activate();

    $scope.logout = function () {
      Auth.logout();
    };

    function activate() {

    }

  }
})();
