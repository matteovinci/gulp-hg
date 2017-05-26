'use strict';

const gutil = require('gulp-util');
const exec = require('child_process').exec;
const shellEscape = require('any-shell-escape');

module.exports = function(dest, opt, cb) {
    if (typeof dest === 'undefined') {
        opt = dest;
        cb = opt;
    }

    opt = opt || {};
    if (!cb && typeof opt === 'function') {
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

    var destName = typeof dest === 'string' ? shellEscape([dest]) : '';
    var cmd = 'hg push ' + destName + opt.args;
    return exec(cmd, {cwd: opt.cwd}, function(err, stdout, stderr) {
        if (err) {
            gutil.log(cmd + '\n' + err);
            return cb(err, stderr);
        }
        gutil.log(cmd + '\n' + stdout, stderr);
        cb(err, stdout);
    });
};
