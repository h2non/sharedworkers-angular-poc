'use strict';

angular.module('webworker')
  .controller('TextboxCtrl', function ($scope, SharedWorkerSrv) {

    $scope.text = 'All happens in your browser, no server communication is required (WebSockets, XHR...)';

    $scope.$watch('text', _.throttle(function () {
        SharedWorkerSrv.send('main.textbox.change', { value: arguments[0] });
      }, 500)
    );

    SharedWorkerSrv.on('main.textbox.change', function (event) {
      $scope.$apply(function () {
        $scope.text = event.value;
      });
    });

  });
