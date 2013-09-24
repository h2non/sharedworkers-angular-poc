# Shared WebWorkers + AngularJS PoC

Web Workers allow you to do things like fire up long-running scripts to handle computationally intensive tasks, but without blocking the UI or other scripts to handle user interactions. They're going to help put and end to that nasty 'unresponsive script' dialog that we've all come to love.

Workers utilize thread-like message passing to achieve parallelism. They're perfect for keeping your UI refresh, performant, and responsive for users.

Shared WebWorker allow you to share a Worker thread across different applications instances in the same browser, 
so you can communicate them without server communication like WebSockets or XHR.

## More information

- [W3C specification](http://www.w3.org/TR/workers)
- [HTML5Rocks tutorial](http://www.html5rocks.com/en/tutorials/workers/basics/) 

## Test it

1. Clone this repository

  ```
  $ git clone https://github.com/h2non/sharedworkers-angular-poc.git
  ```

2. From the cloned repository directory, run:

  ```
  $ npm install
  ```

3. Start the server

  This process assumes you already have installed grunt-cli as global package and it's via $PATH accesible

  ```
  $ grunt server
  ```

## Browser support

See browsers support clicking [here](http://caniuse.com/sharedworkers)

## Author

[Tomas Aparicio](https://github.com/h2non)

## License

MIT license
