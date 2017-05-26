'use strict';

const fs = require('fs');
const should = require('should');
const testsuite = require('../testsuite');
const gutil = require('gulp-util');

module.exports = function(hg) {
    const REPO_PATH = testsuite.repoTestFolders[0];
    const DEFAULT_COMMIT_MESSAGE = 'initial commit';

    beforeEach(function(done) {
        var fakeFiles = [];
        testsuite.testFiles.forEach(function(name) {
            fakeFiles.push(new gutil.File(name));
        });
        var hgAdd = hg.add(function(err) {
            should(err).not.exists;
        });
        hgAdd.on('data', function(newFile) {
            should.exist(newFile);
            should.exist(REPO_PATH + '.hg/objects/');
        });
        fakeFiles.forEach(function(file) {
            hgAdd.write(file);
        });
        hgAdd.end(done);
    });

    it('should commit a file to the repo', function(done) {
        const FAKE_FILE = testsuite.testFiles[0];
        var opt = {cwd: REPO_PATH};
        var hgCommit = hg.commit(DEFAULT_COMMIT_MESSAGE, opt, function(err) {
            should(err).not.exists;
        });
        hgCommit.once('end', function() {
            setTimeout(function() {
                should.exist(testsuite.testCommit);
                fs.readFileSync(testsuite.testCommit)
                    .toString('utf8')
                    .should.match(new RegExp(DEFAULT_COMMIT_MESSAGE));
                done();
            }, 100);
        });
        hgCommit.write(FAKE_FILE);
        hgCommit.end();
    });

    it('should fire an end event', function(done) {
        const FAKE_FILE = testsuite.testFiles[1];
        var opt = {cwd: REPO_PATH};
        var hgCommit = hg.commit(DEFAULT_COMMIT_MESSAGE, opt, function(err) {
            should(err).not.exists;
        });

        hgCommit.on('end', function() {
            done();
        });

        hgCommit.write(FAKE_FILE);
        hgCommit.end();
    });

    it('should commit a file to the repo using raw arguments only', function(done) {
        const FAKE_FILE = testsuite.testFiles[2];
        var opt = {cwd: REPO_PATH, args: '-m "' + DEFAULT_COMMIT_MESSAGE + '"', disableMessageRequirement: true};
        var hgCommit = hg.commit(undefined, opt, function(err) {
            should(err).not.exists;
        });
        hgCommit.once('finish', function() {
            setTimeout(function() {
                fs.readFileSync(testsuite.testCommit)
                    .toString('utf8')
                    .should.match(new RegExp(DEFAULT_COMMIT_MESSAGE));
                done();
            }, 100);
        });
        hgCommit.write(FAKE_FILE);
        hgCommit.end();
    });
};
