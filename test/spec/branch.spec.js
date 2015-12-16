'use strict';

var fs = require('fs');
var should = require('should');
var testsuite = require('../testsuite');

module.exports = function(hg) {

    it('should create a new test branch', function(done) {
        var opt = {cwd: testsuite.repositoryPath};
        var testBranchName = 'branchtest';
        hg.branch(testBranchName, opt, function(err) {
            should(err).not.exists;
            var branchFile = testsuite.repositoryPath + '.hg/branch';
            should.exist(branchFile);
            fs.readFileSync(branchFile)
                .toString('utf8')
                .should.match(new RegExp(testBranchName));
            done();
        });
    });
};
