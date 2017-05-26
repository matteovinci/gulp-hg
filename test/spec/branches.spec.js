'use strict';

const fs = require('fs');
const should = require('should');
const testsuite = require('../testsuite');

module.exports = function(hg) {
    const REPO_PATH = testsuite.repoTestFolders[1];

    it('should get the list of all branches', function(done) {
        var opt = {cwd: REPO_PATH};
        hg.branches(opt, function(err, sdout) {
            should(err).not.exists;
            should(sdout).exists;
            done();
        });
    });
};
