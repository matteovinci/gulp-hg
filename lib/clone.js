'use strict';

const gutil = require('gulp-util');
const exec = require('child_process').exec;
const shellEscape = require('any-shell-escape');

module.exports = function(remote, destination, opt, cb) {
    opt = opt || {};
    if (!remote) {
        return cb(new Error('gulp-hg: Remote name is required for hg.clone'));
    }

    var escapeArr = [remote];

    if (!cb && typeof opt === 'function') {
        cb = opt;
        opt = {};
    }
    if (!cb && typeof destination === 'function') {
        cb = destination;
        opt = {};
    } else if (typeof destination === 'string') {
        escapeArr.push(destination);
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

    var cmd = 'hg clone ' + shellEscape(escapeArr) + opt.args;
    return exec(cmd, {cwd: opt.cwd}, function(err, stdout, stderr) {
        if (err) {
            gutil.log(cmd + '\n' + err);
            return cb(err, stderr);
        }
        gutil.log(cmd + '\n' + stdout, stderr);
        cb(err, stdout);
    });
};
