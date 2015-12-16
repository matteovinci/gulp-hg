'use strict';

var fs = require('fs');
var should = require('should');
var gutil = require('gulp-util');
var testsuite = require('../testsuite');
var del = require('del');
var exec = require('child_process').exec;
require('shelljs/global');

module.exports = function(hg) {

    beforeEach(function() {
        hg.clone(testsuite.remoteRepository, testsuite.clonedRepositoryPath, function(err) {
            should(err).not.exists;
        });
    });

    it('should have cloned project into a specific directory', function() {
        should.exist(testsuite.clonedRepositoryPath + '/.hg');
    });

    afterEach(function() {
        del.sync([testsuite.clonedRepositoryPath]);
    });
};
