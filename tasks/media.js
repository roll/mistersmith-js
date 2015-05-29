'use strict';
var gulp = require('gulp');


// Build
gulp.task('media:build', function() {
    return gulp.src('media/**/*')
        .pipe(gulp.dest('build/media'));
});

// Watch
gulp.task('media:watch', function() {
    gulp.watch('media/**/*', ['media:build']);
});
