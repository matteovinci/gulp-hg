'use strict';

const through = require('through2');
const gutil = require('gulp-util');
const exec = require('child_process').exec;
const shellEscape = require('any-shell-escape');

module.exports = function(opt, callback) {
    opt = opt || {};
    if (!callback && typeof opt === 'function') {
        // No options set
        callback = opt;
        opt = {};
    }

    if (typeof callback !== 'function') {
        callback = function() {};
    }

    if (typeof opt === 'object') {
        opt.args = !opt.args ? '' : ' ' + opt.args;
    }

    var paths = [],
        files = [],
        fileCwd = process.cwd;

    var write = function(file, enc, cb) {
        paths.push(file.path);
        files.push(file);
        fileCwd = file.cwd;
        cb();
    };

    var flush = function(cb) {
        var cwd = opt.cwd || fileCwd;
        var cmd = 'hg add ' + shellEscape(paths) + opt.args;
        var self = this;
        exec(cmd, {cwd: cwd}, function(err, stdout, stderr) {
            if (err && err !== null) {
                cb(err);
                callback(err);
                gutil.log(cmd + '\n' + err);
                return;
            } else {
                // instead of passing null
                err = undefined;
            }
            gutil.log(cmd + '\n' + stdout, stderr);
            files.forEach(self.push.bind(self));
            cb(err, stdout);
            callback(err, stdout);
        });
    };
    return through.obj(write, flush);
};
