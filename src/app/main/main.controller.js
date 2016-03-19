(function() {
  'use strict';

  angular
    .module('nadWeb')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController() {
    var vm = this;

    vm.creationDate = 1458069351477;

    activate();

    function toggleSidebar(){
          $('.sidebar-mini').toggleClass('sidebar-collapse');
          }

    function activate() {
      $('.sidebar-toggle').click(function () {
        toggleSidebar();
      })
    }

  }
})();
