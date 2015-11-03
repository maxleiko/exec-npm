var spawn   = require('child_process').spawn;

/**
 *
 * @param {array}    args     - npm command-line arguments (must contain at least one string command)
 * @param {object}   options  - child_process.spawn options (optional)
 * @param {function} callback - function called when done (first param is the error if any)
 */
function execNpm(args, options, callback) {
    if (typeof callback === 'undefined') {
        callback = options;
        options = {};
    }

    if (args instanceof Array && args.length > 0) {
        var npm = spawn('npm', args, {
            cwd: options.cwd || process.cwd(),
            env: options.env || process.env,
            stdio: options.stdio || 'pipe',
            detached: (typeof options.detached === 'undefined') ? false : options.detached,
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
