'use strict';

var fs = require('fs');
var should = require('should');
var gutil = require('gulp-util');
var del = require('del');

var remoteRepository = 'ssh://hg@bitbucket.org/matteovinci/gulp-hg';
var repositoryName = 'repository-test';
var repositoryPath = __dirname + '/' + repositoryName + '/tmp/';
var clonedRepositoryPath = __dirname + '/' + repositoryName + '/cloned/';
var clonedRepositoryPathCwd = __dirname + '/' + repositoryName + '/cloned-cwd/';

//Setup
if (fs.existsSync(repositoryPath)) {
    del.sync([clonedRepositoryPath, repositoryPath, clonedRepositoryPathCwd]);
}

fs.mkdirSync(repositoryPath);
fs.mkdirSync(clonedRepositoryPathCwd);

var fileContents = function() {
    var testFile = 'test-file.js';

    fs.openSync(repositoryPath + testFile, 'w');
    return fs.readFileSync(repositoryPath + testFile);
};

var testFiles = (function() {
    var testFiles = [];
    for (var i = 0; i < 20; i++) {
        testFiles[i] = {
            base: repositoryPath,
            cwd: repositoryPath,
            path: repositoryPath + 'test-file-' + i + '.js',
            contents: new Buffer(fileContents())
        };
        fs.openSync(testFiles[i].path, 'w');
    }
    return testFiles;
})();

module.exports = {
    repositoryName: repositoryName,
    repositoryPath: repositoryPath,
    clonedRepositoryPathCwd: clonedRepositoryPathCwd,
    remoteRepository: remoteRepository,
    clonedRepositoryPath: clonedRepositoryPath,
    fileContents: fileContents(),
    testCommit: repositoryPath + '.hg/last-message.txt',
    testFiles: testFiles
};
