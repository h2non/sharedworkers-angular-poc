'use strict';

angular.module('webworker')
  .controller('ConnectionsCtrl', function ($scope, SharedWorkerSrv) {

    $scope.ports = 1;

    SharedWorkerSrv.on('$connections', function (event) {
      $scope.$apply(function () {
        $scope.ports = event.connections;
        $scope.id = SharedWorkerSrv.getId();
      });
    });

  });
