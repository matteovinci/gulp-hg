'use strict';

var fs = require('fs');
var should = require('should');
var testsuite = require('../testsuite');

module.exports = function(hg) {

    var repoPath = testsuite.repoTestFolders[0];

    it('should create a new test branch', function(done) {
        var opt = {cwd: repoPath};
        var testBranchName = 'branchtest';
        hg.branch(testBranchName, opt, function(err) {
            should(err).not.exists;
            var branchFile = repoPath + '.hg/branch';
            should.exist(branchFile);
            fs.readFileSync(branchFile)
                .toString('utf8')
                .should.match(new RegExp(testBranchName));
            done();
        });
    });
};
