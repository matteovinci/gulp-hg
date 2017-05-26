'use strict';

const should = require('should');
const testsuite = require('../testsuite');

module.exports = function(hg) {
    it('should pull from the remote repo', function(done) {
        hg.pull({cwd: testsuite.repoTestFolders[1]}, function(err, stdout) {
            should.not.exists(err);
            done();
        });
    });
};
