'use strict';

var fs = require('fs');

var walk    = require('walk');
var files   = [];




var exists = function(path) {
    try {
        fs.statSync(path);
        return true;
    } catch (err) {
        return false;
    }
};


var isHg = function() {
    console.log('process.cwd', process.cwd() + '/.hg');

    // Walker options
    var walker  = walk.walk(process.cwd(), { followLinks: false });

    walker.on('file', function(root, stat, next) {
        // Add this file to the list of files
        files.push(root + '/' + stat.name);
        next();
    });

    walker.on('end', function() {
        console.log(files);
    });

    return exists(process.cwd() + '/.hg');
};

module.exports = {
    isHg: isHg
};
