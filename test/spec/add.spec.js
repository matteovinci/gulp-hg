'use strict';

var should = require('should');
var gutil = require('gulp-util');
var testsuite = require('../testsuite');

module.exports = function(hg) {

    it('should add files to the hg repo', function(done) {
        var fakeFile = new gutil.File(testsuite.testFiles[0]);
        var hgAdd = hg.add(function(err) {
            should(err).not.exists;
        });
        hgAdd.on('data', function(newFile) {
            should.exist(newFile);
            should.exist(testsuite.repositoryPath + '.hg/objects/');
            done();
        });
        hgAdd.write(fakeFile);
        hgAdd.end();
    });

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
            should.exist(testsuite.repositoryPath + '.hg/objects/');
        });
        fakeFiles.forEach(function(file) {
            hgAdd.write(file);
        });
        hgAdd.end(done);
    });

};
