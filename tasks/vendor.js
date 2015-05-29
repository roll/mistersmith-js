'use strict';
var gulp = require('gulp');


// Build
gulp.task('vendor:build', function() {
    return gulp.src('vendor/**/*')
        .pipe(gulp.dest('build/vendor'));
});

// Watch
gulp.task('vendor:watch', function() {
    gulp.watch('vendor/**/*', ['vendor:build']);
});
