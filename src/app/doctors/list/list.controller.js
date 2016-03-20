(function () {
  'use strict';

  angular
    .module('nadWeb')
    .controller('DoctorsListController', DoctorsListController);

  /** @ngInject */
  function DoctorsListController(Restangular, $rootScope) {
    var vm = this;
    vm.addAppointment = addAppointment;

    activate();

    function addAppointment(a) {
      alert(a.timeStr);
    }

    function seed() {
      vm.doctors = [];
      vm.doctors.push({
        name: 'Иванов И.И.',
        spec: 'Терапевт',
        appointments: [
          {time: new Date(), busy: false},
          {time: new Date(), busy: true},
          {time: new Date(), busy: false},
          {time: new Date(), busy: false},
          {time: new Date(), busy: false},
          {time: new Date(), busy: false},
          {time: new Date(), busy: false}
        ]
      }, {
        name: 'Петров П.П.',
        spec: 'Хирург',
        appointments: [
          {time: new Date(), busy: false},
          {time: new Date(), busy: false},
          {time: new Date(), busy: true},
          {time: new Date(), busy: false},
          {time: new Date(), busy: true},
          {time: new Date(), busy: true},
          {time: new Date(), busy: true},
          {time: new Date(), busy: true}
        ]
      }, {
        name: 'Сидоров С.С.',
        spec: 'Стоматолог',
        appointments: [
          {time: new Date(), busy: false},
          {time: new Date(), busy: false},
          {time: new Date(), busy: true},
          {time: new Date(), busy: true},
          {time: new Date(), busy: false},
          {time: new Date(), busy: true}
        ]
      });
    }

    function timeToStr(time) {
      return moment.utc(time.getTime()).format("HH:mm");
    }

    function loadClinic() {
      Restangular.all('/users/me/clinic').get('')
        .then(function (res) {
          $rootScope.clinic = res;
          loadDoctors();
        });
    }

    function loadDoctors() {
      Restangular.all('/doctors/by-clinic/' + $rootScope.clinic._id).get('')
        .then(function (res) {
          if (res.length) {
            vm.doctors = res;
          } else {
            seed();
          }
          prettyTime();
        }, function () {
          seed();
        });
    }

    function prettyTime() {
      angular.forEach(vm.doctors, function (doc) {
        angular.forEach(doc.appointments, function (a) {
          a.timeStr = timeToStr(a.time) + ' - ' + timeToStr(new Date(a.time.getTime() + 20 * 60 * 1000));
        });
      });
    }

    function activate() {
      loadClinic();
    }
  }

})();
