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
    vm.goToShow = goToShow;

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
            Restangular.all('/users/').post({
              name: $scope.user.name,
              email: 'fake' + new Date().getTime() + '@mail.ru',
              password: 'password'
            }).then(function () {
              d = new Date($scope.rec.date.getFullYear(), $scope.rec.date.getMonth(), $scope.rec.date.getDate(),
                $scope.rec.time[0] + '' + $scope.rec.time[1], $scope.rec.time[3] + '' + $scope.rec.time[4], 0, 0);
              Restangular.all('/users/me/receptions/').post({
                doctor: doc._id,
                user: $scope.user._id,
                date: d.toISOString(),
                time: d.toISOString()
              }).then(function () {
                a.isBusy = true;
                $scope.closeThisDialog(0);
              }, function (err) {
                alert('error ' + JSON.stringify(err));
              });
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

    function dateToStr(date) {
      return moment.utc(new Date(date).getTime()).format("DD.MM.YY");
    }

    function loadDoctors() {
      Restangular.all('/doctors/grouped-by-date/').get('')
        .then(function (res) {
          if (res.length) {
            vm.doctors = res[0].doctors;
            vm.dateStr = dateToStr(res[0].date);
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

    function goToShow(docId) {
      $state.go('doctors.show', {id: docId});
    }

    function activate() {
      loadClinic();
    }
  }

})();
