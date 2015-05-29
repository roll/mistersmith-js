'use strict';
var gulp = require('gulp');
var watch = false;


// Build media
gulp.task('build:media', function() {
    return gulp.src('media/**/*')
        .pipe(gulp.dest('build/media'));
});
