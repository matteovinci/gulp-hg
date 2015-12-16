'use strict';

var fs = require('fs');
var gutil = require('gulp-util');
var hg = require('../');
var testsuite = require('./testsuite');
var del = require('del');
require('shelljs/global');


// Disable logging
gutil.log = function() {};

describe('gulp-hg', function() {

    var testSuite = fs.readdirSync(__dirname + '/spec');
    var testFirst = [
        'clone',
        'init',
        'branch',
        'add',
        'commit',
        'status',
        'log'
    ];

    testFirst.concat('merge', 'push', 'pull', 'update').forEach(function(file) {
        testSuite.splice(testSuite.indexOf(file), 1);
    });

    testSuite.unshift.apply(testSuite, testFirst);


    testSuite.forEach(function(filename) {
        describe(filename, function() {
            // the actual suite code
            require('./spec/' + filename + '.spec.js')(hg);
        });
    });


    after(function() {
        cd(__dirname);
        del.sync([testsuite.repositoriesPaths]);
    });
});
