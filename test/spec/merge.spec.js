'use strict';

var fs = require('fs');
var should = require('should');
var testsuite = require('../testsuite');

module.exports = function(hg) {

    it('should merge branches', function(done) {
        var opt = {cwd: './test/' + testsuite.repositoryName + '/'};
        hg.merge('testBranch', opt, function(err) {
            should(err).not.exists;
            setTimeout(function() {
                fs.readFileSync(testsuite.testCommit)
                    .toString('utf8')
                    .should.match(/initial commit/);
                done();
            }, 100);
        });
    });
};
