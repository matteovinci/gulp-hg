'use strict';

var fs = require('fs');
var gutil = require('gulp-util');
var hg = require('../');
var testsuite = require('./testsuite');
var del = require('del');


// Disable logging
gutil.log = function() {};

describe('gulp-hg', function() {

    var testSuite = fs.readdirSync(__dirname + '/spec');
    var testFirst = [
        'clone-cwd',
        'clone',
        'init',
        'branch',
        'add',
        'commit',
        'status',
        'log',
        'pull',
        'update'
    ];

    testFirst.concat('merge', 'push').forEach(function(file) {
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
        del.sync([testsuite.repositoryPath, testsuite.clonedRepositoryPath, testsuite.clonedRepositoryPathCwd]);
    });
});
