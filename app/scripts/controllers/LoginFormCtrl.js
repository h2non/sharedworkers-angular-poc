'use strict';

angular.module('webworker')
  .controller('LoginFormCtrl', function ($scope, SharedWorker) {

    $scope.logged = false;

    $scope.login = function () {
      $scope.logged = true;
      SharedWorker.send('user.form.logged', { logged: $scope.logged });
    };

    SharedWorker.on('user.form.logged', function (event) {
      $scope.$apply(function () {
        console.log(event);
        $scope.logged = event.logged;
      });
    });

  });