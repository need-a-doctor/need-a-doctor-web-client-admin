(function () {
  'use strict';

  angular
    .module('nadWeb')
    .controller('DoctorsAddController', DoctorsAddController);

  /** @ngInject */
  function DoctorsAddController(Restangular, $state) {
    var vm = this;
    vm.specs = null;
    vm.doc = {spec: null};
    vm.save = save;
    vm.goList = goList;

    activate();

    function save() {
      Restangular.all('/specializations/').post(vm.doc).then(function () {
        goList();
      }, function () {
        goList();//TODO
      });
    }

    function goList() {
      $state.go('doctors.list')
    }

    function activate() {
      Restangular.all('/specializations/').get('').then(function (data) {
        vm.specs = data;
        vm.doc = {};
      });
    }
  }

})();
