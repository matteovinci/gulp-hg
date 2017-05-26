'use strict';

const fs = require('fs'),
    should = require('should'),
    del = require('del'),
    REMOTE_REPOSITORY = 'https://matteovinci@bitbucket.org/matteovinci/gulp-hg-test-repo',
    repositoriesPaths = __dirname + '/test-repositories/',
    TEST_BRANCH = 'test-branch';

// Setup
if (fs.existsSync(repositoriesPaths)) {
    del.sync([repositoriesPaths]);
}

fs.mkdirSync(repositoriesPaths);

var repoTestFolders = (function() {
    /**
     * repository-test-0: test init, branch, add, commit, status, log
     * repository-test-1: test clone, pull, update
     * @type {Array}
     */
    var dirs = [];
    for (var i = 0; i < 2; i++) {
        dirs[i] = repositoriesPaths + 'repository-test-' + i + '/';
        fs.mkdirSync(dirs[i]);
    }
    return dirs;
})();

var fileContents = function() {
    var testFile = 'test-file.js';

    if (fs.existsSync(repoTestFolders[0] + testFile)) {
        return fs.readFileSync(repoTestFolders[0] + testFile);
    } else {
        fs.openSync(repoTestFolders[0] + testFile, 'w');
        return fs.readFileSync(repoTestFolders[0] + testFile);
    }
};

var testFiles = (function() {
    var testFiles = [];
    var repo = repoTestFolders[0];
    for (var i = 0; i < 10; i++) {
        testFiles[i] = {
            base: repo,
            cwd: repo,
            path: repo + 'test-file-' + i + '.js',
            contents: new Buffer(fileContents())
        };
        fs.openSync(testFiles[i].path, 'w');
    }
    return testFiles;
})();

module.exports = {
    repositoriesPaths: repositoriesPaths,
    REMOTE_REPOSITORY: REMOTE_REPOSITORY,
    DEFAULT_BRANCH: 'default',
    TEST_BRANCH: TEST_BRANCH,
    fileContents: fileContents(),
    testCommit: repoTestFolders[0] + '.hg/last-message.txt',
    testFiles: testFiles,
    repoTestFolders: repoTestFolders
};
