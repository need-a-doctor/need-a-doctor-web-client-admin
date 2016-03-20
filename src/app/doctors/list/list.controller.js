(function () {
  'use strict';

  angular
    .module('nadWeb')
    .controller('DoctorsListController', DoctorsListController);

  /** @ngInject */
  function DoctorsListController(Restangular, $rootScope, ngDialog, $scope) {
    var vm = this;
    vm.editRec = editRec;

    activate();

    function editRec(doc, a) {
      function n(i) {
        return i < 10 ? '0' + i : i;
      }

      $scope.user = {name: '', phone: '', _id: $rootScope.user._id};
      var d = angular.copy(a.time);
      d.setHours(0, 0, 0, 0, 0);
      var t = n(a.time.getHours()) + ':' + n(a.time.getMinutes());
      $scope.rec = {doctor: doc._id, time: t, date: d, user: $scope.user._id};

      ngDialog.open({
        template: 'templateId',
        className: 'ngdialog-theme-default',
        controller: function ($scope, $rootScope) {

          $scope.save = function () {
            t = new Date(0, 0, 0, t[0] + '' + t[1], t[3] + '' + t[4], 0, 0);
            Restangular.all('/users/me/receptions/').post({
              doctor: doc._id,
              user: $rootScope.user._id,
              date: d,
              time: t
            }).then(function () {
              closeThisDialog(0);
            }, function (err) {
              alert('error ' + JSON.stringify(err));
            });
          };

          $scope.delete = function () {
            Restangular.all('/users/me/receptions/').delete(1);
          };
        },
        scope: $scope
      });
    }

    function seed() {
      vm.doctors = [];
      vm.doctors.push({
        _id: '56ed7437ac337758274f7661',
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
        _id: '56ed7437ac337758274f7661',
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
        _id: '56ed7437ac337758274f7661',
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
