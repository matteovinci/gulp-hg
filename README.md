
#gulp-hg

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
Support for the following mercurial method (NB: new updates are coming soon):

 * add
 * branch
 * clone
 * commit
 * init
 * log
 * merge
 * pull
 * push
 * status
 * update

##Example

```javascript
var gulp = require('gulp');
var hg = require('../');

//init repository
gulp.task('init', function() {
    hg.init(function(error, stdout) {
        if(!error){
        	//repository initialized
        }
    });
});


// add files
gulp.task('add', function() {
    gulp.src('./*')
        .pipe(hg.add(function(error, stdout){
        	if(!error){
				//add completed
			}
        });
});


// commit files
gulp.task('commit', function() {
    gulp.src('./*', {buffer: false})
        .pipe(hg.commit('initial commit', function(error, stdout){
        	if(!error){
				//add completed
			}
        }));
});

// commit files with arguments
gulp.task('commitargs', function() {
    gulp.src('./*')
        .pipe(hg.commit('initial commit', {args: ' * v'}, function(error, stdout){
			if(!error){
				//add completed
			}
		}));
});

// clone remote repository to current directory
gulp.task('clone', function() {
    hg.clone('ssh://hg@bitbucket.org/matteovinci/gulp-hg', function(error, stdout) {
        // handle error
    });
});

// clone remote repository to folder
gulp.task('clonesubfolder', function() {
    hg.clone('ssh://hg@bitbucket.org/matteovinci/gulp-hg', './sub/folder', function(error, stdout) {
        // handle error
    });
});

// merge
gulp.task('merge', function() {
    hg.merge(function(error, stdout) {
        //if (error) ...
    });
});

// push to remote repository
gulp.task('push', function() {
    hg.push('ssh://hg@bitbucket.org/matteovinci/gulp-hg', function(error, stdout){
	if(!error){
		//push completed
	}
  });
});


// pull from remote repository
gulp.task('pull', function() {
    hg.pull(function(error, stdout){
		if(!error){
			//push completed
		}
  });
});

// status
gulp.task('status', function() {
    hg.status(function(error, stdout){
		if(!error){
			//status completed
		}
	});
});

// log
gulp.task('log', function() {
    hg.log(function(error, stdout){
		if(!error){
			//push completed
		}
	});
});

// pull
gulp.task('pull', function() {
    hg.pull(function(error, stdout){
		if(!error){
			//pull completed
		}
	});
});

// branch
gulp.task('branch', function() {
    hg.branch('new-branch', function(error, stdout){
		if(!error){
			//branch completed
		}
	});
});

// merge
gulp.task('merge', function() {
    hg.merge('development', function(error, stdout){
		if(!error){
			//merge completed
		}
	});
});

// default gulp task
gulp.task('default', ['add']);

```

##API

### hg.init(options, callback)
`hg init`

Creates an empty hg repository

`options`: Object (optional) `{args: 'options', cwd: '/cwd/path'}`

`callback`: function, passed error (if any) and command stdout

```js
hg.init({args:'options'}, function (error, stdout) {
  //if (error) ...
});
```

### hg.clone(remote_repo, options, callback)
`hg clone <remote_repo> <options>`

Clones a remote repository for the first time in the current folder

`remote_repo`: String, remote url

`options`: Object (optional) `{args: 'options', cwd: '/cwd/path'}`

`callback`: function, passed error (if any) and command stdout

```js
hg.clone('https://remote.hg', function (error, stdout) {
  //if (error) ...
});
```

### hg.clone(remote_repo, destination_folder, options, callback)
`hg clone <remote_repo> <destination_folder> <options>`

Clones a remote repository to a destination folder

`remote_repo`: String, remote url

`destination_folder`: String, destination folder

`options`: Object (optional) `{args: 'options', cwd: '/cwd/path'}`

`callback`: function, passed error (if any) and command stdout

```js
hg.clone('https://remote.hg', './my-sub-folder', function (error, stdout) {
  //if (error) ...
});
```

### hg.add(options, callback)
`hg add <files>`

Adds files to repository

`options`: Object (optional) `{args: 'options'}`
`callback`: function, passed error (if any) and command stdout


```js
gulp.src('./*')
  .pipe(hg.add(function(error, stdout){
  	if(!error){
  		//add completed
  		console.log('stdout', stdout);
  	}
  }));
});
```

### hg.commit(message, options, callback)
`hg commit -m <message> <files>`

Commits changes to repository

`message`: String, commit message

`options`: Object (optional) `{args: 'options', cwd: '/cwd/path', maxBuffer: 200 * 1024}`

`callback`: function, passed error (if any) and command stdout

```js
gulp.src('./*')
  .pipe(hg.commit('commit message', function(error, stdout){
  	if(!error){
  		//commit completed
  	}
  }));
});
```

### hg.pull(options, callback)
`hg pull`

Pulls changes from remote repository

`options`: Object (optional) `{args: 'options', cwd: '/cwd/path'}`

`callback`: function, passed error (if any) and command stdout

```js
hg.pull(function(error, stdout){
	if(!error){
		//commit completed
	}
  });
```

### hg.push(branch, options, callback)
`hg push <branch>`

Pushes changes to remote repository

`branch`: String, branch, default: `master`

`options`: Object (optional) `{args: 'options', cwd: '/cwd/path'}`

`callback`: function, passed error (if any) and command stdout

```js
hg.push('default', function(error, stdout){
	if(!error){
		//commit completed
	}
 });
```

### hg.branch(branch, options, callback)
`hg branch <new branch name>`

Creates a new branch but doesn't switch to it

`branch`: String, branch

`options`: Object (optional) `{args: 'options', cwd: '/cwd/path'}`

`callback`: function, passed error (if any) and command stdout

```js
hg.branch('development', function(error, stdout){
	if(!error){
		//branch completed
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
hg.merge('development', function(error, stdout){
	if(!error){
		//branch completed
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
  if (!error){
  	//status completed
  }
});
```

### hg.log(options, callback)
`hg status <options>`

Show the working tree log

`options`: Object (optional) `{args: 'options', cwd: '/cwd/path', maxBuffer: 200 * 1024}`

`callback`: function (optional), passed error and command stdout

```js
hg.log({args : '--tag'}, function (error, stdout) {
  if (!error){
  	//log completed
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
  if (!error){
  	//pull completed	
  }
});
```

##Utils
### hg.utils.isHg()

Check if the current directory is a mercurial repository

```js
var isHg = hg.utils.isHg();
```



## LICENSE

(MIT License)

Copyright (c) 2015 Matteo Vinci <matteovinci88@gmail.com> https://www.linkedin.com/in/matteovinci



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




