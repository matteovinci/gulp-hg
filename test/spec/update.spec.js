'use strict';

var should = require('should');
var testsuite = require('../testsuite');
var del = require('del');

module.exports = function(hg) {
    var cloneDestinationPath = testsuite.repoTestFolders[4];

    beforeEach(function() {
        hg.clone(testsuite.remoteRepository, cloneDestinationPath, {cwd: cloneDestinationPath});
    });

    it('should update an hg repo', function(done) {
        hg.update(function(err, stdout) {
            should.not.exists(err);
            done();
        });
    });
};
