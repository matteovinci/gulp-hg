'use strict';

var should = require('should');
var testsuite = require('../testsuite');
var del = require('del');

module.exports = function(hg) {
    beforeEach(function() {
        hg.clone(testsuite.remoteRepository, testsuite.clonedRepositoryPath);
    });

    it('should update an hg repo', function(done) {
        hg.update(function(err, stdout) {
            should.not.exists(err);
            done();
        });
    });

    afterEach(function() {
        del.sync([testsuite.clonedRepositoryPath]);
    });
};
