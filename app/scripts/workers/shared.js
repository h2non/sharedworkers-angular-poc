'use strict';

var ports = []; // store
var portCounter = 0;

self.addEventListener('connect', function (event) {

  var port = event.ports[0];
  port.id = portCounter += 1;
  ports.push(port);

  function closeAll() {
    ports.forEach(function (port) {
      port.close();
    });
    ports = [];
    portCounter = 0;
  }

  function dispatchAll(event) {
    var data = event.data;

    ports.forEach(function (port) {
      if (port.id !== data.emitterId) {
        data.connections = ports.length;
        data.portId = port.id;
        port.postMessage(data);
      }
    });

    if (data.channel === '$close' || data.channel === '$closeAll') {
      if (data.portId) {
        ports = ports.filter(function (port) {
          if (port.id === data.emitterId) {
            port.close();
            return false;
          } else {
            return true;
          }
        });
      } else {
        closeAll();
      }
    }

  }

  port.addEventListener('message', dispatchAll, false);
  port.addEventListener('error', dispatchAll, false);

  port.start();

}, false);
