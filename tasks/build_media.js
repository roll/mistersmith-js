'use strict';
var gulp = require('gulp');


// Build media
gulp.task('build:media', ['build:clean'], function() {
    return gulp.src('media/**/*')
        .pipe(gulp.dest('build/media'));
});
