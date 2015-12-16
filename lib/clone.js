'use strict';

var gutil = require('gulp-util');
var exec = require('child_process').exec;
var shellEscape = require('any-shell-escape');

module.exports = function(remote, destination, opt, cb) {

    var escapeArr = [remote];
    if (!cb && typeof opt === 'function') {
        cb = opt;
        opt = {};
    }
    if (!cb && typeof destination === 'function') {
        cb = destination;
        opt = {};
    } else if (destination) {
        escapeArr.push(destination);
    }

    if (!cb || typeof cb !== 'function') cb = function() {
    };
    if (!opt) opt = {};
    if (!opt.cwd) {
        opt.cwd = process.cwd();
    }

    opt.args = !opt.args ? '' : ' ' + opt.args;

    var cmd = 'hg clone ' + shellEscape(escapeArr) + opt.args;
    return exec(cmd, {cwd: opt.cwd}, function(err, stdout, stderr) {
        if (err) {
            return cb(err);
        }
        gutil.log(stdout, stderr);
        cb(err, stdout);
    });
};
