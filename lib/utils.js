'use strict';

const fs = require('fs');

var exists = function(path) {
    try {
        fs.statSync(path);
        return true;
    } catch (err) {
        return false;
    }
};


var isHg = function(opt) {
    opt = typeof opt === 'object' ? opt : {};
    opt.cwd = opt.cwd || process.cwd();
    return exists(opt.cwd + '/.hg');
};

module.exports = {
    isHg: isHg
};
