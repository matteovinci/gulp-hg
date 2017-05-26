'use strict';

const fs = require('fs');
const should = require('should');
const testsuite = require('../testsuite');
const gutil = require('gulp-util');

module.exports = function(hg) {
    var REPO_PATH = testsuite.repoTestFolders[0];
    it('should hg status', function(done) {
        var opt = {cwd: REPO_PATH};
        var fakeFile = new gutil.File(testsuite.testFiles[0]);
        fs.openSync(fakeFile.path, 'w');
        hg.status(opt, function(err, stdout) {
            should(err).not.exists;
            fs.exists(fakeFile.path, function(exists) {
                exists.should.be.true;
                done();
            });
        });
    });
};
