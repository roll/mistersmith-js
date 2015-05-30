'use strict';
var loader = require('gulp-load-plugins');


module.exports = function() {
    return loader({
        pattern: ['*'],
        replaceString: /(^(gulp|lodash|metalsmith)(-|\.)|-|\.)/g,
        camelize: false,
        rename: {},
    });
};
