'use strict';
var loader = require('gulp-load-plugins');


module.exports = loader({
    pattern: ['*'],
    replaceString: /(^(gulp|lodash|metalsmith)(-|\.)|-|\.)/g,
    camelize: false,
    rename: {},
});
