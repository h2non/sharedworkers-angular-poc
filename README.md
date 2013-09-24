# Shared WebWorkers + AngularJS PoC

Web Workers allow you to do things like fire up long-running scripts to handle computationally intensive tasks, but without blocking the UI or other scripts to handle user interactions. They're going to help put and end to that nasty 'unresponsive script' dialog that we've all come to love.

Workers utilize thread-like message passing to achieve parallelism. They're perfect for keeping your UI refresh, performant, and responsive for users.

Shared WebWorker allow you to share a Worker thread across different applications instances in the same browser, so you can communicate them without server communication like WebSockets or XHR.

## More information

- [W3C specification](http://www.w3.org/TR/workers)
- [HTML5Rocks tutorial](http://www.html5rocks.com/en/tutorials/workers/basics/) 

## About

This proof of concept aims to test some features of Web Shared WebWorkers and the amazing AngularJS two-way DOM data binding power, you can eaisly share data states and events across multiple window context instances using a basic implementation of an event bus service and a shared WebWorker.

Sharing and synchronizing data between different window instances (in the same browser sharing it's origin hostname) it's also possible via Web Storate API (aka localStorage), but if you don't need a layer of data persistence, it's more convenient to use Shared WebWorkers

## Test it

[Click here](http://h2non.github.io/sharedworkers-angular-poc/) for access to the live demo page

### Local

This process assumes you already have installed node.js in your system, and grunt-cli and bower as global packages and both are via $PATH accesible

1. Clone this repository

  ```
  $ git clone https://github.com/h2non/sharedworkers-angular-poc.git
  ```

2. From the cloned repository directory, run:

  ```
  $ npm install
  ```

  ```
  $ bower install
  ```

3. Start the server

  ```
  $ grunt server
  ```

4. Open diferent browser windows and start playing with the elements.

## Browser support

See browsers support clicking [here](http://caniuse.com/sharedworkers)

## Author

[Tomas Aparicio](https://github.com/h2non)

## License

MIT license
