'use strict';

var fs = require('fs');
var should = require('should');
var gutil = require('gulp-util');
var testsuite = require('../testsuite');
var del = require('del');
var exec = require('child_process').exec;
require('shelljs/global');

module.exports = function(hg) {

    var cloneDestinationPath = testsuite.repoTestFolders[1];
    var cwd = process.cwd();

    beforeEach(function(done) {
        hg.clone(testsuite.remoteRepository, cloneDestinationPath, function(err) {
            cd(cloneDestinationPath);
            should(err).not.exists;
            done();
        });

    });

    it('should have cloned project into a specific directory', function(done) {
        hg.utils.isHg().should.be.equal(true);
        done();
    });

    afterEach(function() {
        cd(cwd);
    });
};
