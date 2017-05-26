'use strict';
/* global cd */

require('shelljs/global');
const fs = require('fs');
const should = require('should');
const testsuite = require('../testsuite');
const del = require('del');
const exec = require('child_process').exec;

module.exports = function(hg) {
    const CLONE_DESTINATION_PATH = testsuite.repoTestFolders[1];

    beforeEach(function(done) {
        hg.clone(testsuite.REMOTE_REPOSITORY, CLONE_DESTINATION_PATH, function(err) {
            should(err).not.exists;
            done();
        });
    });

    it('should have cloned project into a specific directory', function(done) {
        cd(CLONE_DESTINATION_PATH);
        setTimeout(function() {
            hg.utils.isHg().should.be.equal(true);
            done();
        }, 100);
    });
};
