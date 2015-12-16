'use strict';

var should = require('should');
var testsuite = require('../testsuite');

module.exports = function(hg) {

    var repoPath = testsuite.repoTestFolders[0];

    before(function(done) {
        hg.init({cwd: repoPath}, function(err) {
            should(err).not.exists;
            done();
        });
    });

    it('should initialize a empty hg repo', function(done) {
        should.exist(repoPath + '.hg/');
        done();
    });

};
