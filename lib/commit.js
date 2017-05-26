'use strict';

const through = require('through2'),
    gutil = require('gulp-util'),
    exec = require('child_process').exec,
    shellEscape = require('any-shell-escape'),
    path = require('path');

module.exports = function(message, opt, callback) {
    opt = opt || {};
    if (!callback && typeof opt === 'function') {
        // No options set
        callback = opt;
        opt = {};
    }

    if (!message || message.length === 0) {
        if (opt.args.indexOf('--amend') === -1 && opt.disableMessageRequirement !== true) {
            throw new Error('gulp-hg: Commit message is required hg.commit -m "commit message" or --amend arg must be given');
        }
    }

    if (typeof opt === 'object') {
        if (!opt.cwd) {
            opt.cwd = process.cwd();
        }

        // Default buffer value for child_process.exec
        if (!opt.maxBuffer) {
            opt.maxBuffer = 200 * 1024;
        }
        opt.args = !opt.args ? '' : ' ' + opt.args;
    }

    var files = [];
    var paths = [];

    var write = function(file, enc, cb) {
        files.push(file);
        paths.push(path.relative(opt.cwd, file.path).replace('\\', '/'));
        cb();
    };

    var flush = function(cb) {
        var cmd = 'hg commit ';
        if (message) {
            // Check if the message is multiline (array)
            if (message && Object.prototype.toString.call(message) === '[object Array]') {
                var messageExpanded = '';
                // repeat -m as needed
                for (var i = 0; i < message.length; i++) {
                    messageExpanded += '-m "' + message[i] + '" ';
                }
                cmd += messageExpanded + opt.args;
                if (!opt.disableAppendPaths) {
                    cmd += ' ' + shellEscape(paths);
                }
            } else {
                cmd += '-m "' + message + '"' + opt.args;
                if (!opt.disableAppendPaths) {
                    cmd += ' ' + shellEscape(paths);
                }
            }
        }

        var self = this;
        var execChildProcess = exec(cmd, opt, function(err, stdout, stderr) {
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
            self.emit('end');
            return cb(err, stdout);
        });

        // If the user wants, we'll emit data events during exec
        // they can listen to them with .on('data',function(data){ });
        // in their task
        if (opt.emitData) {
            execChildProcess.stdout.on('data', function(data) {
                self.emit('data', data);
            });
            execChildProcess.stderr.on('data', function(data) {
                self.emit('data', data);
            });
        }
    };
    return through.obj(write, flush);
};
