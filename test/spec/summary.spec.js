'use strict';

const should = require('should');
const testsuite = require('../testsuite');

module.exports = function(hg) {
    var REPO_PATH = testsuite.repoTestFolders[0];
    it('should hg summary', function(done) {
        var opt = {cwd: REPO_PATH};
        hg.summary(opt, function(err, stdout) {
            should(err).be.eql(null);
            done();
        });
    });
};
