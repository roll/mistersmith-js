'use strict';
var gulp = require('gulp');


// Build
gulp.task('images:build', function() {
    return gulp.src('images/**/*')
        .pipe(gulp.dest('build/images'));
});

// Watch
gulp.task('images:watch', function() {
    gulp.watch('images/**/*', ['images:build']);
});
