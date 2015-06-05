'use strict';
var gulp = require('gulp');
var error = require('./handlers/error');
var stack = require('./loaders/stack')();
var watch = false;


// Build
gulp.task('images:build', function() {
    var data = require('./loaders/data')();
    return gulp.src('images/**/*.*')
        .pipe(stack.if(watch, stack.plumber(error)))
        .pipe(stack.cache(stack.imagemin(data.stack.imagemin)))
        .pipe(gulp.dest('build/images'));
});

// Watch
gulp.task('images:watch', function() {
    gulp.watch('images/**/*.*', ['images:build']);
    watch = true;
});
