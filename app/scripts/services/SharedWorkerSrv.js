'use strict';

angular.module('webworker')
  .factory('SharedWorkerSrv',
    function ($window) {

      var worker,
          opened = true,
          ports = 0,
          portId = null,
          listeners = [];

      if (typeof $window.Worker !== 'function') {
        throw new Error('Web Workers not supported. Try with a modern browser');
      }

      if (typeof $window.SharedWorker !== 'function') {
        throw new Error('Shared Web Workers not supported. Try with a modern browser');
      }

      worker = new $window.SharedWorker('scripts/workers/shared.js');

      function buildEventObj(data) {
        return _.extend({
          emitterId: portId
        }, data);
      }

      function sendMessage(channel, data) {
        worker.port.postMessage(buildEventObj({ channel: channel, data: data }));
      }

      function fireEvent(event) {
        var data = event.data.data,
            channel = event.data.channel,
            emitterId = event.data.emitterId,
            connections = event.data.connections;

        if (!opened) {
          return;
        }

        function dispatchListeners(channel, data) {
          listeners.forEach(function (listener) {
            if (listener.channel === channel) {
              listener.handler(data);
            }
          });
        }

        if (portId === null) {
          portId = event.data.portId;
        }

        console.log(event);

        if (event.type === 'error') {
          return dispatchListeners('$error', event);
        }

        if (portId !== emitterId) {
          if (channel === '$closeAll') {
            worker.port.close();
          }
          dispatchListeners(channel, data);
        }

        if (ports !== connections) {
          dispatchListeners('$connections', { connections: connections });
        }
      }

      function onEvent(channel, fn) {
        if (channel && fn) {
          listeners.push({ channel: channel, handler: fn });
        }
      }

      function clean(channel, fn) {
        listeners = listeners.filter(function (listener) {
          var filter;
          if (fn) {
            filter = listener.channel !== channel && listener.handler === fn;
          } else {
            filter = listener.channel !== channel;
          }
          return filter;
        });
      }

      function cleanAll(channel) {
        if (channel) {
          listeners = listeners.filter(function (listener) {
            return listener.channel !== channel;
          });
        } else {
          listeners = [];
        }
      }

      function getId() {
        return portId;
      }

      function close() {
        cleanAll();
        sendMessage('$close', { portId: portId });
        opened = false;
      }

      function closeAll() {
        cleanAll();
        sendMessage('$closeAll');
        opened = false;
      }

      worker.port.addEventListener('message', fireEvent, false);
      worker.port.addEventListener('error', fireEvent, false);

      worker.port.start();

      return {
        worker: worker,
        on: onEvent,
        clean: clean,
        cleanAll: cleanAll,
        send: sendMessage,
        close: close,
        closeAll: closeAll,
        getId: getId
      };
    }
  );
