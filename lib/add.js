'use strict';

var through = require('through2');
var gutil = require('gulp-util');
var exec = require('child_process').exec;
var shellEscape = require('any-shell-escape');

module.exports = function(opt, callback) {
    if (!callback && typeof opt === 'function') {
        // optional options
        callback = opt;
        opt = {};
    }
    if (!callback || typeof callback !== 'function') callback = function() {
    };
    if (!opt) opt = {};
    opt.args = !opt.args ? '' : ' ' + opt.args;

    var paths = [];
    var files = [];
    var fileCwd = process.cwd;

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
                return;
            } else {
                //instead of passing null
                err = undefined;
            }
            gutil.log(stdout, stderr);
            files.forEach(self.push.bind(self));
            cb(err, stdout);
            callback(err, stdout);
        });
    };

    return through.obj(write, flush);
};
