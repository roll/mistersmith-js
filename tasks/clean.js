'use strict';
var gulp = require('gulp');
var del = require('del');


// Clean build directory
gulp.task('clean', function (callback) {
    del(['build/**/*'], callback);
});
