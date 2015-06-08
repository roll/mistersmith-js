'use strict';
var gulp = require('gulp');
var code = require('./bindings/code');
var stack = code.loaders.stack();
var watch = false;


// Build
gulp.task('images:build', function() {
    var data = code.loaders.data();
    return gulp.src('images/**')
        .pipe(stack.if(watch, stack.plumber(code.handlers.error)))
        .pipe(stack.cache(stack.imagemin(data.stack.imagemin)))
        .pipe(gulp.dest('build/images'));
});

// Watch
gulp.task('images:watch', function() {
    gulp.watch('images/**', ['images:build']);
    watch = true;
});
