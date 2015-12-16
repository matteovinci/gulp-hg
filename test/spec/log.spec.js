'use strict';

var fs = require('fs');
var should = require('should');
var gutil = require('gulp-util');
var testsuite = require('../testsuite');

module.exports = function(hg) {

    var repoPath = testsuite.repoTestFolders[0];

    it('should hg log', function(done) {
        var opt = {cwd: repoPath};

        hg.log(opt, function(err, stdout) {
            should(err).be.eql(null);
            done();
        });
    });
};
