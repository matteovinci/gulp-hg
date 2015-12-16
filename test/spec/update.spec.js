'use strict';

var should = require('should');
var testsuite = require('../testsuite');
var del = require('del');

module.exports = function(hg) {

    var cloneDestinationPath = testsuite.repoTestFolders[1];

    it('should update an hg repo', function(done) {
        hg.update({cwd: cloneDestinationPath}, function(err, stdout) {
            should.not.exists(err);
            done();
        });
    });
};
