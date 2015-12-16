'use strict';

var fs = require('fs');
var should = require('should');
var exec = require('child_process').exec;
var testsuite = require('../testsuite');

module.exports = function(hg) {

    var repoPath = testsuite.repoTestFolders[0];

    var defaultMessage = 'initial commit';
    it('should commit a file to the repo', function(done) {
        var fakeFile = testsuite.testFiles[0];
        var opt = {cwd: repoPath};
        var hgCommit = hg.commit(defaultMessage, opt, function(err) {
            should(err).not.exists;
        });
        hgCommit.once('end', function() {
            setTimeout(function() {
                should.exist(testsuite.testCommit);
                fs.readFileSync(testsuite.testCommit)
                    .toString('utf8')
                    .should.match(/initial commit/);
                done();
            }, 100);
        });
        hgCommit.write(fakeFile);
        hgCommit.end();
    });

    it('should fire an end event', function(done) {
        var fakeFile = testsuite.testFiles[1];
        var opt = {cwd: repoPath};
        var hgCommit = hg.commit(defaultMessage, opt, function(err) {
            should(err).not.exists;
        });

        hgCommit.on('end', function() {
            done();
        });

        hgCommit.write(fakeFile);
        hgCommit.end();
    });

    it('should commit a file to the repo using raw arguments only', function(done) {
        var fakeFile = testsuite.testFiles[2];
        var opt = {cwd: repoPath, args: '-m "initial commit"', disableMessageRequirement: true};
        var hgCommit = hg.commit(undefined, opt, function(err) {
            should(err).not.exists;
        });
        hgCommit.once('finish', function() {
            setTimeout(function() {
                fs.readFileSync(testsuite.testCommit)
                    .toString('utf8')
                    .should.match(/initial commit/);
                done();
            }, 100);
        });
        hgCommit.write(fakeFile);
        hgCommit.end();
    });
};
