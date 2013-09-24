'use strict';

angular.module('webworker')
  .controller('NavCtrl', function ($scope, SharedWorkerSrv) {

    var selected = 0;

    $scope.login = true;
    $scope.closed = false;
    $scope.closedAll = false;

    $scope.select = function (id) {
      selected = id;
      SharedWorkerSrv.send('nav.menu.selectchange', { id: id });
    };

    $scope.isActive = function (id) {
      return id === selected;
    };

    $scope.switchLogin = function () {
      $scope.login = $scope.login ? false : true;
      SharedWorkerSrv.send('nav.menu.login', { status: $scope.login });
    };

    $scope.close = function () {
      $scope.closed = true;
      SharedWorkerSrv.close();
    };

    $scope.closeAll = function () {
      $scope.closedAll = true;
      SharedWorkerSrv.closeAll();
    };

    SharedWorkerSrv.on('nav.menu.selectchange', function (event) {
      $scope.$apply(function () {
        selected = event.id;
      });
    });

    SharedWorkerSrv.on('nav.menu.login', function (event) {
      $scope.$apply(function () {
        $scope.login = event.status;
      });
    });

    SharedWorkerSrv.on('$closeAll', function () {
      $scope.$apply(function () {
        $scope.closedAll = true;
      });
    });

  });
