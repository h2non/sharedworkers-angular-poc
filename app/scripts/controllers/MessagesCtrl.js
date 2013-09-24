'use strict';

angular.module('webworker')
  .controller('MessagesCtrl', function ($scope, SharedWorkerSrv) {

    var messages = {
      success: true,
      error: true,
      info: true
    };

    $scope.close = function (type) {
      messages[type] = false;
      SharedWorkerSrv.send('main.notifications.messages', { messages: messages });
    };

    $scope.visible = function (type) {
      return messages[type];
    };

    SharedWorkerSrv.on('main.notifications.messages', function (event) {
      $scope.$apply(function () {
        messages = event.messages;
      });
    });

  });
