'use strict';

const should = require('should');
const testsuite = require('../testsuite');

module.exports = function(hg) {
    it('should update the default branch', function(done) {
        hg.update(testsuite.DEFAULT_BRANCH, {cwd: testsuite.repoTestFolders[1]}, function(err, stdout) {
            should.not.exists(err);
            done();
        });
    });

    it('should update the current branch', function(done) {
        hg.update({cwd: testsuite.repoTestFolders[1]}, function(err, stdout) {
            should.not.exists(err);
            done();
        });
    });
};
