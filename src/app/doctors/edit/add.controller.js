(function () {
  'use strict';

  angular
    .module('nadWeb')
    .controller('DoctorsAddController', DoctorsAddController);

  /** @ngInject */
  function DoctorsAddController(Restangular, $state) {
    var vm = this;
    vm.specs = null;
    vm.doc = {name: '', spec: ''};
    vm.save = save;
    vm.goList = goList;

    activate();

    function save() {
      Restangular.all('/users/me/clinic/doctors/').customPOST({name: vm.doc.name}).then(function () {
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
