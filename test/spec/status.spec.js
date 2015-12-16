'use strict';

var fs = require('fs');
var should = require('should');
var gutil = require('gulp-util');
var testsuite = require('../testsuite');

module.exports = function(hg) {

    var repoPath = testsuite.repoTestFolders[0];

    it('should hg status', function(done) {
        var opt = {cwd: repoPath};
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
