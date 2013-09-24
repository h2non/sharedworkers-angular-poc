'use strict';

angular.module('webworker')
  .controller('NotificationsCtrl', function ($scope, SharedWorkerSrv) {

    $scope.messages = [];

    function addMessage(message) {
      if ($scope.messages.length > 2) {
        $scope.messages = $scope.messages.slice(1);
      }

      $scope.messages.push({
        text: message,
        closed: false
      });

      $scope.$apply();
    }

    $scope.close = function (index) {
      $scope.messages.splice(index, 1);
    };

    SharedWorkerSrv.on('$close', function (event) {
      addMessage('Port ' +  event.portId + ' has been closed!');
    });

    SharedWorkerSrv.on('$closeAll', function (event) {
      addMessage('All the ports has been closed!');
    });

  });