'use strict';
var gutil = require('gulp-util');


module.exports = function(error) {
    gutil.log(gutil.colors.red(error.message));;
    gutil.beep();
    this.emit('end');
};
