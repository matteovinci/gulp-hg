[![npm version](https://badge.fury.io/js/gulp-hg.svg)](https://badge.fury.io/js/gulp-hg)
[![Build Status](https://travis-ci.org/matteovinci/gulp-hg.svg?branch=master)](https://travis-ci.org/matteovinci/gulp-hg)

# gulp-hg

<table>
<tr>
<td>Package</td><td>gulp-hg</td>
</tr>
<tr>
<td>Description</td>
<td>Hg mercurial plugin for gulp (gulpjs.com)</td>
</tr>
</table>

## Usage
### Install
    npm install gulp-hg --save

### Features
Support for the following mercurial methods

 * init
 * clone
 * add
 * commit
 * branch
 * branches
 * merge
 * log
 * pull
 * push
 * status
 * update
 * summary
 * revert

## Example

```javascript
var gulp = require('gulp');
var hg = require('gulp-hg');

// Init repository
gulp.task('init', function() {
    hg.init(function(error, stdout) {
        if (!error) {
        	// Repository initialized
        }
    });
});

// Clone remote repository to current directory
gulp.task('clone', function() {
    hg.clone('https://matteovinci@bitbucket.org/matteovinci/gulp-hg-test-repo', function(error, stdout) {
        if (!error) {
            // Completed
        }
    });
});

// Clone remote repository to a specific folder
gulp.task('clonesubfolder', function() {
    hg.clone('https://matteovinci@bitbucket.org/matteovinci/gulp-hg-test-repo', './sub/folder', function(error, stdout) {
        if (!error) {
            // Completed
        }
    });
});

// Add all files within a specific folder (or in the current one ./*)
gulp.task('add', function() {
    gulp.src('./my-files/*')
        .pipe(hg.add(function(error, stdout) {
        	if (!error) {
				// Completed
			}
        }));
});


// Commit files within a specific folder (or in the current one ./*)
gulp.task('commit', function() {
    gulp.src('./my-files-to-be-committed/*', {buffer: false})
        .pipe(hg.commit('initial commit', function(error, stdout) {
        	if (!error) {
				// Completed
			}
        }));
});

// Commit files with arguments
gulp.task('commitargs', function() {
    gulp.src('./my-files-to-be-committed/*')
        .pipe(hg.commit('initial commit', {args: '--amend'}, function(error, stdout) {
			if (!error) {
				// Completed
			}
		}));
});

// Commit files with raw arguments only
gulp.task('commitargs', function() {
    gulp.src('./my-files-to-be-committed/*')
        .pipe(hg.commit(undefined, {args: '-m "First commit"', disableMessageRequirement: true}, function(error, stdout) {
			if (!error) {
				// Completed
			}
		}));
});


// Branch
// Get the current branch name
gulp.task('branch', function() {
    hg.branch({cwd: './myRepoPath'}, function(error, branchName) {
		if (!error) {
		    // Completed
			console.log('Current branch name', branchName);
		}
	});
});

// Create a new branch on the repository
gulp.task('branch', function() {
    hg.branch('new-branch', {cwd: './myRepoPath'}, function(error, stdout) {
		if (!error) {
			// Branch created successfully
		}
	});
});

// Branches list
gulp.task('branches', function() {
    hg.branches({cwd: './myRepoPath'}, function(error, stdout) {
		if (!error) {
			// Completed
			console.log('Branches', stdout);
		}
	});
});

// Merge
gulp.task('merge', function() {
    hg.merge({cwd: './myRepoPath'}, function(error, stdout) {
        if (!error) {
            // Completed
        }
    });
});

// Log
gulp.task('log', function() {
    hg.log(function(error, stdout) {
		if (!error) {
			// Push completed
		}
	});
});

// Pull from remote repository
gulp.task('pull', function() {
    hg.pull({cwd: './myRepoPath'}, function(error, stdout) {
		if (!error) {
			// Completed
		}
  });
});

// Push to remote repository
gulp.task('push', function() {
    hg.push('https://matteovinci@bitbucket.org/matteovinci/gulp-hg-test-repo', {cwd: './myRepoPath'}, function(error, stdout) {
        if (!error) {
            // Completed
        }
  });
});

// Status
gulp.task('status', function() {
    hg.status({cwd: './myRepoPath'}, function(error, stdout) {
		if (!error) {
			// Completed
		}
	});
});

// Update
// Using a specific branch
gulp.task('update', function() {
    hg.update('default', {cwd: './myRepoPath'}, function(error, stdout) {
		if (!error) {
			// Completed
		}
	});
});

// Using the current branch
gulp.task('update', function() {
    hg.update({cwd: './myRepoPath'}, function(error, stdout) {
		if (!error) {
			// Completed
		}
	});
});

// Summary
gulp.task('summary', function() {
    hg.summary(function(error, stdout) {
		if (!error) {
			// Summary completed
		}
  });
});

// Revert
gulp.task('revert', function() {
    hg.revert(function(error, stdout) {
		if (!error) {
			// Revert completed
		}
  });
});

```

## API

### hg.init(options, callback)
`hg init`

Creates an empty hg repository

`options`: Object (optional) `{args: 'options', cwd: '/cwd/path'}`

`callback`: function, passed error (if any) and command stdout

```js
hg.init({cwd: 'myRepoFolder'}, function (error, stdout) {
    if (!error) {
        // Operation completed
    }
});
```

### hg.clone(remote, options, callback)
`hg clone <remote> <options>`

Clones a remote repository for the first time in the current folder

`remote`: String, remote url

`options`: Object (optional) `{args: 'options', cwd: '/cwd/path'}`

`callback`: function, passed error (if any) and command stdout

```js
hg.clone('https://matteovinci@bitbucket.org/matteovinci/gulp-hg-test-repo', function (error, stdout) {
    if (!error) {
        // Operation completed
    }
});
```

### hg.clone(remote, destination, options, callback)
`hg clone <remote> <destination> <options>`

Clones a remote repository to a destination folder

`remote`: String, remote url

`destination`: String, destination folder

`options`: Object (optional) `{args: 'options', cwd: '/cwd/path'}`

`callback`: function, passed error (if any) and command stdout

```js
hg.clone('https://matteovinci@bitbucket.org/matteovinci/gulp-hg-test-repo', './my-sub-folder', function (error, stdout) {
    if (!error) {
        // Operation completed
    }
});
```

### hg.add(options, callback)
`hg add <files>`

Adds files to repository

`options`: Object (optional) `{args: 'options'}`
`callback`: function, passed error (if any) and command stdout


```js
gulp.src('./*')
  .pipe(hg.add(function(error, stdout) {
  	if (!error) {
  		// Add completed
  		console.log('stdout', stdout);
  	}
  }));
```

### hg.commit(message, options, callback)
`hg commit -m <message> <files>`

Commits changes to repository

`message`: String, commit message

`options`: Object (optional) `{args: 'options', cwd: '/cwd/path', maxBuffer: 200 * 1024}`

`callback`: function, passed error (if any) and command stdout

```js
gulp.src('./*')
  .pipe(hg.commit('commit message', function(error, stdout) {
  	if (!error) {
  		// Commit completed
  	}
  }));
```
### hg.branch(branch, options, callback)
`hg branch <new branch name>`

Creates a new branch but doesn't switch to it

`branch`: String (optional), branch to create (if not defined the function will return the current tip branch)

`options`: Object (optional) `{args: 'options', cwd: '/cwd/path'}`

`callback`: function, passed error (if any) and command stdout

```js
hg.branch('development', function(error, stdout) {
	if (!error) {
		// Branch added
	}
  });
```

### hg.branch(options, callback)
`hg branch <new branch name>`

Returns the current branch name

`options`: Object (optional) `{args: 'options', cwd: '/cwd/path'}`

`callback`: function, passed error (if any) and command stdout

```js
hg.branch(function(error, stdout) {
	if (!error) {
		// Completed
		console.log('Current branch', stdout);
	}
  });
```

### hg.branches(options, callback)
`hg branches`

List repository named branches

`options`: Object (optional) `{args: 'options', cwd: '/cwd/path'}`

`callback`: function, passed error (if any) and command stdout

```js
hg.branches(function(error, stdout) {
	if (!error) {
		// Completed
		console.log('Branches', stdout);
	}
  });
```

### hg.merge(branch, options, callback)
`hg merge <branch name> <options>`

Merges a branch into the current branch

`branch`: String, source branch

`options`: Object (optional) `{args: 'options', cwd: '/cwd/path'}`

`callback`: function, passed error (if any) and command stdout

```js
hg.merge('development', function(error, stdout) {
	if (!error) {
		// branch completed
	}
  });
```

### hg.log(options, callback)
`hg status <options>`

Show the working tree log

`options`: Object (optional) `{args: 'options', cwd: '/cwd/path', maxBuffer: 200 * 1024}`

`callback`: function (optional), passed error and command stdout

```js
hg.log({args : '-v'}, function (error, stdout) {
    if (!error) {
        // Operation completed
    }
});
```

### hg.pull(options, callback)
`hg pull`

Pulls changes from remote repository

`options`: Object (optional) `{args: 'options', cwd: '/cwd/path'}`

`callback`: function, passed error (if any) and command stdout

```js
hg.pull(function(error, stdout) {
	if (!error) {
		// Commit completed
	}
  });
```

### hg.push(branch, options, callback)
`hg push <branch>`

Pushes changes to remote repository

`branch`: String, branch, default: `default`

`options`: Object (optional) `{args: 'options', cwd: '/cwd/path'}`

`callback`: function, passed error (if any) and command stdout

```js
hg.push('default', function(error, stdout) {
	if (!error) {
		// Commit completed
	}
 });
```

### hg.status(options, callback)
`hg status <options>`

Show the working tree status

`options`: Object (optional) `{args: 'options', cwd: '/cwd/path', maxBuffer: 200 * 1024}`

`callback`: function (optional), passed error (if any) and command stdout

```js
hg.status({args : '--tag'}, function (error, stdout) {
    if (!error) {
        // Operation completed
    }
});
```

### hg.update(branch, options, callback)
`hg update <branch> <options>`

Update the repository to a specific branch

`branch`: String (optional), branch

`options`: Object (optional) `{args: 'options', cwd: '/cwd/path', maxBuffer: 200 * 1024}`

`callback`: function (optional), passed error (if any) and command stdout

```js
// Using a specific branch
gulp.task('update', function() {
    hg.update('default', function(error, stdout) {
		if (!error) {
			// Completed
		}
	});
});

// Using the current branch
gulp.task('update', function() {
    hg.update(function(error, stdout) {
		if (!error) {
			// Completed
		}
	});
});
```

### hg.summary(options, callback)
`hg summary <options>`

Summarize working directory state

`options`: Object (optional) `{args: 'options', cwd: '/cwd/path', maxBuffer: 200 * 1024}`

`callback`: function (optional), passed error and command stdout

```js
hg.summary(function (error, stdout) {
    if (!error) {
        // Operation completed
    }
});

hg.summary({args: '--remote'}, function (error, stdout) {
    if (!error) {
        // Operation completed
    }
});
```

### hg.revert(options, callback)
`hg revert <options>`

Restore files to their checkout state

`options`: Object (optional) `{args: 'options', cwd: '/cwd/path', maxBuffer: 200 * 1024}`

`callback`: function (optional), passed error and command stdout

```js
hg.revert({args: '--all'}, function (error, stdout) {
    if (!error) {
        // Operation completed
    }
});
```

### hg.pull(options, callback)
`hg status <options>`

Show the working tree log

`options`: Object (optional) `{args: 'options', cwd: '/cwd/path'}`

`callback`: function (optional), passed error and command stdout

```js
hg.pull({args : '--branch my-branch'}, function (error, stdout) {
  if (!error) {
  	//pull completed
  }
});
```

##Utils
### hg.utils.isHg()

Check if the current directory is a mercurial repository

`options`: Object (optional) `{cwd: '/cwd/path'}`

```js
var isHg = hg.utils.isHg({cwd: './pathToMyCurrentRepoFolder'});
```



## LICENSE

(MIT License)

Copyright (c) 2017 Matteo Vinci <matteovinci88@gmail.com> https://www.linkedin.com/in/matteovinci



Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:



The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.



THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
