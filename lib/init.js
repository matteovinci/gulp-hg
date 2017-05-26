'use strict';

const gutil = require('gulp-util');
const exec = require('child_process').exec;

module.exports = function(opt, cb) {
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

    var cmd = 'hg init' + opt.args;
    return exec(cmd, {cwd: opt.cwd}, function(err, stdout, stderr) {
        if (err) {
            gutil.log(cmd + '\n' + err);
            return cb(err, stderr);
        }
        gutil.log(cmd + '\n' + stdout, stderr);
        cb(err, stdout);
    });
};
