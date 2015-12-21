'use strict';

var testsuite = require('../testsuite');
require('shelljs/global');

module.exports = function(hg) {

    var cloneDestinationPath = testsuite.repoTestFolders[0];
    var cwd = process.cwd();

    beforeEach(function(done) {
        cd(cloneDestinationPath);
        done();
    });

    it('should check if the current working directory is a mercurial repo', function(done) {
        hg.utils.isHg().should.be.equal(true);
        done();
    });

    afterEach(function(done) {
        cd(cwd);
        done();
    });
};
