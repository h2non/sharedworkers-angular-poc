'use strict';

angular.module('webworker')
  .controller('TextboxCtrl', function ($scope, SharedWorker) {

    $scope.text = 'All happens in the browser, no server communication are required (WebSockets, XHR...)';

    $scope.$watch('text', _.throttle(function () {
        SharedWorker.send('main.textbox.change', { value: arguments[0] });
      }, 500)
    );

    SharedWorker.on('main.textbox.change', function (event) {
      $scope.$apply(function () {
        console.log(event);
        $scope.text = event.value;
      });
    });

  });