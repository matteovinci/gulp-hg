'use strict';

const should = require('should');
const testsuite = require('../testsuite');

module.exports = function(hg) {
    const REPO_PATH = testsuite.repoTestFolders[0];
    beforeEach(function(done) {
        hg.init({cwd: REPO_PATH}, function(err) {
            should(err).not.exists;
            done();
        });
    });

    it('should initialize a empty hg repo', function() {
        should.exist(REPO_PATH + '.hg/');
    });
};
