'use strict';

angular.module('webworker')
  .controller('SearchCtrl', function ($scope, SharedWorkerSrv) {

    $scope.search = null;

    $scope.users = [
      "john", "bill", "charlie",
      "robert", "alban", "oscar",
      "marie", "celine", "brad",
      "drew", "rebecca", "michel",
      "francis", "jean", "paul",
      "pierre", "nicolas", "alfred",
      "gerard", "louis", "albert",
      "edouard", "benoit", "guillaume",
      "nicolas", "joseph"
    ];

    $scope.select = function (user) {
      $scope.search = user + ' ';
    };

    $scope.$watch('search', _.throttle(function () {
        SharedWorkerSrv.send('main.search.change', { value: arguments[0] });
      }, 500)
    );

    SharedWorkerSrv.on('main.search.change', function (event) {
      $scope.$apply(function () {
        $scope.search = event.value;
      });
    });

  });
