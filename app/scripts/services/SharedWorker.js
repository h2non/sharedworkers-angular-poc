'use strict';

angular.module('webworker')
  .factory('SharedWorker', 
    function ($window) {

      var worker,
          ports = 0,
          id = null,
          listeners = [];

      if (typeof $window.Worker !== 'function') {
        throw new Error('Web Workers not supported. Try with a modern browser');
      }

      if (typeof $window.SharedWorker !== 'function') {
        throw new Error('Shared Web Workers not supported. Try with a modern browser');
      }

      worker = new SharedWorker('scripts/workers/shared.js');
      
      function send(channel, data) {
        worker.port.postMessage({ channel: channel, data: data });
      }

      function fireEvent(event) {
        var data = event.data.data,
            channel = event.data.channel,
            portId = event.data.portId,
            connections = event.data.connections;

        function dispatchListeners(channel, data) {
          listeners.forEach(function (listener) {
            if (listener.channel === channel) {
              listener.handler(data);
            }
          });
        }

        if (id !== portId) {
          dispatchListeners(channel, data);
        }

        if (ports !== connections) {
          dispatchListeners('$connections', { connections: connections });
        }

        if (portId === null) {
          portId = data.portId;
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
            listener.channel !== channel && listener.handler === fn;
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

      worker.port.addEventListener('message',
        function (event) {
          fireEvent(event);
        }, false
      );

      worker.port.start();

      return { 
        worker: worker,
        on: onEvent,
        clean: clean,
        cleanAll: cleanAll,
        send: send
      };
    }
  );