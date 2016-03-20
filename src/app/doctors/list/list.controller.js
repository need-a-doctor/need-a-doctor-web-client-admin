(function () {
  'use strict';

  angular
    .module('nadWeb')
    .controller('DoctorsListController', DoctorsListController);

  /** @ngInject */
  function DoctorsListController(Restangular, $rootScope, ngDialog, $scope, $state) {
    var vm = this;
    vm.editRec = editRec;
    vm.goAdd = goAdd;

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
            d = new Date($scope.rec.date.getFullYear(), $scope.rec.date.getMonth(), $scope.rec.date.getDate(),
              $scope.rec.time[0] + '' + $scope.rec.time[1], $scope.rec.time[3] + '' + $scope.rec.time[4], 0, 0);
            Restangular.all('/users/me/receptions/').post({
              doctor: doc._id,
              user: $rootScope.user._id,
              date: d.toISOString(),
              time: d.toISOString()
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
      Restangular.all('/doctors/grouped-by-date/').get('')//TODO
        .then(function (res) {
          if (res.length) {
            vm.doctors = res[0].doctors;
          }
          prettyTime();
        }, function () {
          alert('error');
        });
    }

    function prettyTime() {
      angular.forEach(vm.doctors, function (doc) {
        angular.forEach(doc.receptions, function (r) {
          r.time = new Date(r.time);
          r.timeStr = timeToStr(r.time);
        });
      });
    }

    function goAdd() {
      $state.go('doctors.add');
    }

    function activate() {
      loadClinic();
    }
  }

})();
