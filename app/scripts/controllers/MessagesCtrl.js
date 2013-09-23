'use strict';

angular.module('webworker')
  .controller('MessagesCtrl', function ($scope, SharedWorker) {

    var messages = {
      success: true,
      error: true,
      info: true
    };

    $scope.close = function (type) {
      messages[type] = false;
      SharedWorker.send('main.notifications.messages', { messages: messages });
    };

    $scope.visible = function (type) {
      return messages[type];
    };

    SharedWorker.on('main.notifications.messages', function (event) {
      $scope.$apply(function () {
        messages = event.messages;
      });
    });

  });
