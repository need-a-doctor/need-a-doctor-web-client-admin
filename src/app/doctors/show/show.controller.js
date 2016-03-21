(function () {
  'use strict';

  angular
    .module('nadWeb')
    .controller('DoctorsShowController', DoctorsShowController);

  /** @ngInject */
  function DoctorsShowController(Restangular, $rootScope, ngDialog, $scope, $state, $stateParams) {
    var vm = this;
    vm.editRec = editRec;

    activate();

    function prettyTime() {
      angular.forEach(vm.dods, function (dod) {
        dod.date = new Date(dod.date);
        dod.dateStr = dateToStr(dod.date);
        angular.forEach(dod.doctor.receptions, function (r) {
          r.time = new Date(r.time);
          r.timeStr = timeToStr(r.time);
        });
      });
    }

    function activate() {
      Restangular.all('/doctors/' + $stateParams.id + '/grouped-by-date/').get('')
        .then(function (res) {
          if (res.length) {
            vm.dods = res;
          }
          prettyTime();
        }, function () {
          alert('error');
        });
    }
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

  }



  function dateToStr(date) {
    return moment.utc(new Date(date).getTime()).format("DD.MM.YY");
  }

  function timeToStr(time) {
    return moment.utc(time.getTime()).format("HH:mm");
  }

})();
