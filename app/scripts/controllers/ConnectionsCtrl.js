'use strict';

angular.module('webworker')
  .controller('ConnectionsCtrl', function ($scope, SharedWorker) {

    $scope.ports = 1;

    SharedWorker.on('$connections', function (event) {
      $scope.$apply(function () {
        $scope.ports = event.connections;
      });
    });

  });