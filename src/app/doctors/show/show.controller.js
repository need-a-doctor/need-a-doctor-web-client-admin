(function () {
  'use strict';

  angular
    .module('nadWeb')
    .controller('DoctorsShowController', DoctorsShowController);

  /** @ngInject */
  function DoctorsShowController(Restangular, $state, $stateParams) {
    var vm = this;

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
  }

  function dateToStr(date) {
    return moment.utc(new Date(date).getTime()).format("DD.MM.YY");
  }

  function timeToStr(time) {
    return moment.utc(time.getTime()).format("HH:mm");
  }

})();
