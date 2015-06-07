'use strict';
var gulp = require('gulp');


// Watch
gulp.task('data:watch', function() {
    gulp.watch('data/**', ['pages:build']);
});
