'use strict';
/* global cd */

const testsuite = require('../testsuite');

module.exports = function(hg) {
    const CWD = process.cwd();

    it('should check if the current working directory is a mercurial repo', function() {
        hg.utils.isHg({cwd: testsuite.repoTestFolders[0]}).should.be.equal(true);
    });

    afterEach(function() {
        cd(CWD);
    });
};
