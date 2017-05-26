1.0.5 / 2017-05-26
* Added support for `hg revert`
* Added support for `hg summary`
* Added support for `hg branch` with no branch name (returns the current branch name)
* Added support for `hg branches`
* Added the following unit tests to the testing queue: 
    - `summary.spec.js`
    - `clone.spec.js`
    - `pull.spec.js`
    - `update.spec.js`
    - `branch.spec.js`
    - `branches.spec.js`
    - `revert.spec.js`
* In `testsuite.js` removed the extra slash in: `dirs[i] = repositoriesPaths + 'repository-test-' + i + '/';`
* Removed unnecessary calls to `done()` in non async unit tests
* Updated `README.md` and created `changelog.md`
