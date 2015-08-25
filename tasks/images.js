'use strict';
var gulp = require('gulp');
var stack = gulp.meta.loaders.stack();
var config = gulp.meta.loaders.config();
var watch = false;


// Build
gulp.task('images:build', function() {
    return gulp.src('images/**')
        .pipe(stack.if(watch, stack.plumber(gulp.meta.handlers.error)))
        .pipe(stack.cache(stack.imagemin(config.imagemin)))
        .pipe(gulp.dest('build/images'));
});

// Watch
gulp.task('images:watch', function() {
    gulp.watch('images/**', ['images:build']);
    watch = true;
});
