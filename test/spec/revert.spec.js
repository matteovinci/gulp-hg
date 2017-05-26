'use strict';

const fs = require('fs');
const should = require('should');
const testsuite = require('../testsuite');

module.exports = function(hg) {
    var REPO_PATH = testsuite.repoTestFolders[0];
    it('should hg revert --all', function(done) {
        var opt = {args: '--all', cwd: REPO_PATH};
        hg.revert(opt, function(err, stdout) {
            should(err).be.eql(null);
            done();
        });
    });
};
