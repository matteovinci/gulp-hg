'use strict';

const should = require('should');
const gutil = require('gulp-util');
const testsuite = require('../testsuite');

module.exports = function(hg) {
    var REPO_PATH = testsuite.repoTestFolders[0];

    it('should add multiple files to the hg repo', function(done) {
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
};
