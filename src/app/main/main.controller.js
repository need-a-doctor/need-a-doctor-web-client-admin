(function () {
  'use strict';

  angular
    .module('nadWeb')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(Auth) {
    var vm = this;

    activate();

    function toggleSidebar() {
      $('.sidebar-mini').toggleClass('sidebar-collapse');
    }

    function logout() {
      Auth.logout();
    };

    function activate() {
      $('#qqqq').click(function () {
        logout();
      });
      $('.sidebar-toggle').click(function () {
        toggleSidebar();
      })

      $(window).resize();
    }

  }
})();
