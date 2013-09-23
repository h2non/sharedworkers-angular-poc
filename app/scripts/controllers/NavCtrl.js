'use strict';

angular.module('webworker')
  .controller('NavCtrl', function ($scope, SharedWorker) {

    var selected = 0;

    $scope.login = true;

    $scope.select = function (id) {
      selected = id;
      SharedWorker.send('nav.menu.selectchange', { id: id });
    };

    $scope.isActive = function (id) {
      return id === selected;
    };

    $scope.switchLogin = function () {
      $scope.login = $scope.login ? false : true;
      SharedWorker.send('nav.menu.login', { status: $scope.login });
    };

    SharedWorker.on('nav.menu.selectchange', function (event) {
      $scope.$apply(function () {
        selected = event.id;
      });
    });

    SharedWorker.on('nav.menu.login', function (event) {
      $scope.$apply(function () {
        $scope.login = event.status;
      });
    });

  });