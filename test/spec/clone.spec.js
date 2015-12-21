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
            should(err).not.exists;
            cd(cloneDestinationPath);
            done();
        });

    });

    it('should have cloned project into a specific directory', function() {
        hg.utils.isHg().should.be.equal(true);
    });

    afterEach(function() {
        cd(cwd);
    });
};
