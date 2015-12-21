'use strict';

var fs = require('fs');

var exists = function(path) {
    try {
        fs.statSync(path);
        return true;
    } catch (err) {
        return false;
    }
};


var isHg = function() {
    //console.log('process.cwd', process.cwd() + '/.hg');
    return exists(process.cwd() + '/.hg');
};

module.exports = {
    isHg: isHg
};
