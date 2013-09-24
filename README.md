# Shared WebWorkers + AngularJS PoC

Web Workers allow you to do things like fire up long-running scripts to handle computationally intensive tasks, but without blocking the UI or other scripts to handle user interactions. They're going to help put and end to that nasty 'unresponsive script' dialog that we've all come to love.

Workers utilize thread-like message passing to achieve parallelism. They're perfect for keeping your UI refresh, performant, and responsive for users.

Shared WebWorker allow you to share a Worker thread across different applications instances in the same browser, so you can communicate them without server communication like WebSockets or XHR.

## More information

- [W3C specification](http://www.w3.org/TR/workers)
- [HTML5Rocks tutorial](http://www.html5rocks.com/en/tutorials/workers/basics/) 

## About

This proof of concept aims to test some features of Web Shared and AngularJS two-way DOM data binding, sharing data states and application events across multiple windows instances using a basic implementation of a event bus service.

## Test it

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
