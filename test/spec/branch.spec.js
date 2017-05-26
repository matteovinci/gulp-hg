'use strict';

const fs = require('fs');
const should = require('should');
const testsuite = require('../testsuite');

module.exports = function(hg) {
    const REPO_PATH = testsuite.repoTestFolders[1];
    const REPO_PATH_DEFAULT_BRANCH = testsuite.DEFAULT_BRANCH;
    const TEST_BRANCH_NAME = testsuite.TEST_BRANCH + '-new';

    it('should get the current default branch', function(done) {
        var opt = {cwd: REPO_PATH};
        hg.branch(opt, function(err, sdout) {
            should(err).not.exists;
            sdout.should.match(new RegExp(REPO_PATH_DEFAULT_BRANCH));
            done();
        });
    });

    it('should create a new test branch', function(done) {
        var opt = {cwd: REPO_PATH};
        hg.branch(TEST_BRANCH_NAME, opt, function(err) {
            should(err).not.exists;
            const BRANCH_FILE_PATH = REPO_PATH + '.hg/branch';
            should.exist(BRANCH_FILE_PATH);
            fs.readFileSync(BRANCH_FILE_PATH)
                .toString('utf8')
                .should.match(new RegExp(TEST_BRANCH_NAME));
            done();
        });
    });
};
