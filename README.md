# exec-npm
Executes npm within a child_process fork in order to prevent npm to take too much memory in the current one.  
*This module has been created to free the [Kevoree Node.js runtime](https://github.com/kevoree/kevoree-nodejs-runtime) from npm's heavy memory usage.*

### Installation

```sh
npm i exec-npm --save
```

### Usage
```js
var execNpm = require('exec-npm');

// arguments to give to npm client
// this is equivalent to a call to:
//  $ cd /where/to/install/modules
//  $ npm install minimist async express
var cmd = [ 'install', 'minimist', 'async', 'express', '--prefix=/where/to/install/modules' ];

execNpm(cmd, function (err) {
  if (err) {
    console.log('Something went wrong: '+err.message);
  } else {
    console.log('Success');
  }
});
```
> **NB.** When you specify a `prefix`, `npm` will always append to it the `node_modules` folder.

### API

**execNpm(args, options, callback)**: *Function*  
 - args: *Array* - command-line arguments to give to the **npm** client (see npm's help)
 - options (optional): *Object* - child_process fork options
 - callback: *Function* - a function to be called when the process is done (first parameter is the error, if any)
