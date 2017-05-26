'use strict';
/* global cd */

require('shelljs/global');
const fs = require('fs'),
    gutil = require('gulp-util'),
    hg = require('../'),
    testsuite = require('./testsuite'),
    del = require('del');

// Disable logging
gutil.log = function() {};

describe('gulp-hg', function() {
    var testSuite = fs.readdirSync(__dirname + '/spec');
    var testFirst = [
        'init',
        'utils',
        'revert',
        'add',
        'commit',
        'status',
        'log',
        'summary',
        'clone',
        'pull',
        'branch',
        'branches',
        'update',
        'push'
    ];

    testFirst.concat('merge').forEach(function(file) {
        testSuite.splice(testSuite.indexOf(file), 1);
    });

    testSuite.unshift.apply(testSuite, testFirst);

    testSuite.forEach(function(filename) {
        describe(filename, function() {
            // require the related suite code
            require('./spec/' + filename + '.spec.js')(hg);
        });
    });

    after(function() {
        cd(__dirname);
        del.sync([testsuite.repositoriesPaths]);
    });
});
