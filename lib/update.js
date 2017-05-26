'use strict';

const gutil = require('gulp-util');
const exec = require('child_process').exec;
const shellEscape = require('any-shell-escape');

module.exports = function(branch, opt, cb) {
    if (typeof branch === 'undefined') {
        gutil.log('gulp-hg: Warning branch argument is not set. In this case you will update the current branch instead a specific branch');
        opt = branch;
        cb = opt;
    }
    opt = opt || {};
    if (!cb && typeof opt === 'function') {
        // No options set
        cb = opt;
        opt = {};
    }

    if (typeof cb !== 'function') {
        cb = function() {};
    }

    if (typeof opt === 'object') {
        if (!opt.cwd) {
            opt.cwd = process.cwd();
        }
        opt.args = !opt.args ? '' : ' ' + opt.args;
    }

    var branchName = typeof branch === 'string' ? shellEscape([branch]) : '';
    var cmd = 'hg update ' + branchName + opt.args;
    return exec(cmd, {cwd: opt.cwd}, function(err, stdout, stderr) {
        if (err) {
            gutil.log(cmd + '\n' + err);
            return cb(err, stderr);
        }
        gutil.log(cmd + '\n' + stdout, stderr);
        cb(err, stdout);
    });
};
