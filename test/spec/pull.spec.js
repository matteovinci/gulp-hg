'use strict';

var should = require('should');
var testsuite = require('../testsuite');
var del = require('del');

module.exports = function(hg) {

    beforeEach(function() {
        hg.clone(testsuite.remoteRepository, testsuite.clonedRepositoryPath);
    });

    it('should pull from the remote repo', function(done) {
        hg.pull(function(err, stdout) {
            should.not.exists(err);
            done();
        });
    });

    afterEach(function() {
        del.sync([testsuite.clonedRepositoryPath]);
    });
};
