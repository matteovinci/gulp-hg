'use strict';

const fs = require('fs');
const should = require('should');
const testsuite = require('../testsuite');

module.exports = function(hg) {

    var getToken = function() {
        var text = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 64; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    };

    it('should push a changed file to the repository', function(done) {
        const TEST_FILE_PATH = testsuite.repoTestFolders[1] + 'test-file.txt';
        var randomString = getToken();
        fs.writeFileSync(TEST_FILE_PATH, randomString, 'utf-8');

        const TEST_FILE = {
            base: testsuite.repoTestFolders[1],
            cwd: testsuite.repoTestFolders[1],
            path: TEST_FILE_PATH,
            contents: randomString
        };

        var opt = {cwd: TEST_FILE.cwd};
        var hgCommit = hg.commit('Testing hg push: file updated with a random string', opt, function(err) {
            should(err).not.exists;
        });

        hgCommit.once('finish', function() {
            hg.push(opt, function(err) {
                should(err).not.exists;
                done();
            });
        });
        hgCommit.write(TEST_FILE);
        hgCommit.end();
    });
};
