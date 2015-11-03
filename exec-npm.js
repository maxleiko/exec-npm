var fork   = require('child_process').fork,
    path   = require('path');

/**
 *
 * @param {array}    args     - npm command-line arguments (must contain at least one string command)
 * @param {object}   options  - child_process.fork options (optional)
 * @param {function} callback - function called when done (first param is the error if any)
 */
function execNpm(args, options, callback) {
    if (typeof callback === 'undefined') {
        callback = options;
        options = {};
    }

    if (args instanceof Array && args.length > 0) {
        var npm = fork(path.resolve(__dirname, 'node_modules', 'npm', 'cli.js'), args, {
            cwd: options.cwd || process.cwd(),
            env: options.env || process.env,
            execPath: options.execPath || process.execPath,
            execArgv: options.execArgv || process.execArgv,
            silent: (typeof options.silent === 'undefined') ? false : options.silent,
            uid: (typeof options.uid === 'number') ? options.uid : undefined,
            gid: (typeof options.uid === 'number') ? options.gid : undefined
        });

        npm.on('close', function (code) {
          if (code !== 0) {
            callback(new Error('npm '+args.join(' ')));
          } else {
            callback();
            npm.unref();
          }
        });
    } else {
        callback(new Error('execNpm "args" param must contain at least one string command'));
    }
}

module.exports = execNpm;
