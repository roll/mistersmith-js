'use strict';
var loader = require('gulp-load-plugins');


module.exports = function(options) {
    var stack =  loader({
        pattern: ['*'],
        replaceString: /(^(gulp|lodash|metalsmith)(-|\.)|-|\.)/g,
        camelize: false,
        rename: {},
    });
    if (options && options.key) {
        return stack[options.key];
    }
    return stack;
};
