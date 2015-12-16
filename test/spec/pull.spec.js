'use strict';

var should = require('should');
var testsuite = require('../testsuite');
var del = require('del');
require('shelljs/global');

module.exports = function(hg) {

    var cloneDestinationPath = testsuite.repoTestFolders[3];

    beforeEach(function() {
        hg.clone(testsuite.remoteRepository, cloneDestinationPath);
    });

    it('should pull from the remote repo', function(done) {
        cd(cloneDestinationPath);
        hg.pull({cwd: cloneDestinationPath}, function(err, stdout) {
            should.not.exists(err);
            done();
        });
    });
};
