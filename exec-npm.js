var spawn = require('child_process').spawn;

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
        var cmd = 'npm';
        if (/^win/.test(process.platform)) {
            cmd = process.env.comspec;
            args.unshift('/c');
            args.unshift('npm');
        }

        var npm = spawn(cmd, args, {
            cwd: options.cwd || process.cwd(),
            env: options.env || process.env,
            stdio: options.stdio || 'pipe',
            detached: (typeof options.detached === 'undefined') ? false : options.detached,
            uid: (typeof options.uid === 'number') ? options.uid : undefined,
            gid: (typeof options.uid === 'number') ? options.gid : undefined
        });

        var error;
        npm.on('close', function(code) {
            switch (code) {
                case -2:
                  callback(error);
                  break;

                case 0:
                  callback();
                  break;

                default:
                  callback(new Error('npm ' + args.join(' ')));
                  break;
            }

            npm.unref();
        });

        npm.on('error', function(err) {
            error = err;
        });
    } else {
        callback(new Error('execNpm "args" param must contain at least one string command'));
    }
}

module.exports = execNpm;
