'use strict';
var gulp = require('gulp');


// Watch
gulp.task('layouts:watch', function() {
    gulp.watch('layouts/**/*', ['pages:build']);
});
