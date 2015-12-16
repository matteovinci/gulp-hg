'use strict';

var should = require('should');
var testsuite = require('../testsuite');

module.exports = function(hg) {

    before(function(done) {
        hg.init({cwd: testsuite.repositoryPath}, function(err) {
            should(err).not.exists;
            done();
        });
    });

    it('should initialize a empty hg repo', function(done) {
        should.exist(testsuite.repositoryPath + '/.hg/');
        done();
    });

};
