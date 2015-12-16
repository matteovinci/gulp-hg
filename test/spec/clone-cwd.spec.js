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

    beforeEach(function() {
        cd(cloneDestinationPath);
        hg.clone(testsuite.remoteRepository, function(err) {
            should(err).not.exists;
        });
    });

    it('should have cloned project into the current directory', function() {
        should.exist(cloneDestinationPath + '/.hg');
    });

    afterEach(function() {
        cd('..');
    });
};
