(function () {
  'use strict';

  angular
    .module('nadWeb')
    .controller('DoctorsEditController', DoctorsEditController);

  /** @ngInject */
  function DoctorsEditController(Restangular, $state, $stateParams) {
    var vm = this;
    vm.specs = null;
    vm.doc = {spec: null};
    vm.save = save;
    vm.goList = goList;

    activate();

    function save() {
      Restangular.all('/users/me/clinic/doctors/'+vm.doc._id).customPUT(vm.doc).then(function () {
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
        Restangular.all('/doctors/' + $stateParams.id).get('').then(function (data) {
          vm.doc = data;
        });
      });
    }
  }

})();
