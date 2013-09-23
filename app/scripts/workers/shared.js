'use strict';

var ports = []; // store all

self.addEventListener("connect", function (event) {

  var port = event.ports[0];
  var portId = ports.length + 1;
  ports.push(port);

  function dispatchAll(event) {
    ports.forEach(function (port) {
      event.data.connections = ports.length;
      event.data.portId = portId;
      port.postMessage(event.data);
    });
  }

  port.addEventListener("message", function (event) {
    dispatchAll(event);
  }, false);

  port.start();

}, false);
