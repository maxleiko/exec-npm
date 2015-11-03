var os = require('os');
var execNpm = require('../exec-npm');

describe('execNpm', function () {
    this.timeout(5000);
    var cmd;

    it('should install "async" in temp dir', function (done) {
        cmd = [ 'install', 'async', '--prefix='+os.tmpdir() ];
        execNpm(cmd, done);
    });

    it('should uninstall "async" from temp dir', function (done) {
        cmd = [ 'uninstall', 'async', '--prefix='+os.tmpdir() ];
        execNpm(cmd, done);
    });

    it('should list the dependencies of the exec-npm module', function (done) {
        cmd = [ 'ls' ];
        execNpm(cmd, done);
    });
});
