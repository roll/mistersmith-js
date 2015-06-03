'use strict';
var gulp = require('gulp');
var stack = require('./loaders/stack')();


// Build
gulp.task('images:build', function() {
    return gulp.src('images/**/*')
        .pipe(stack.cache(stack.imagemin({
              progressive: true,
              interlaced: true,
        })))
        .pipe(gulp.dest('build/images'));
});

// Watch
gulp.task('images:watch', function() {
    gulp.watch('images/**/*', ['images:build']);
});
