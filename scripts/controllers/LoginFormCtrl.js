'use strict';

angular.module('webworker')
  .controller('LoginFormCtrl', function ($scope, SharedWorkerSrv) {

    $scope.logged = false;

    $scope.login = function () {
      $scope.logged = true;
      SharedWorkerSrv.send('user.form.logged', { logged: $scope.logged });
    };

    SharedWorkerSrv.on('user.form.logged', function (event) {
      $scope.$apply(function () {
        $scope.logged = event.logged;
      });
    });

  });
