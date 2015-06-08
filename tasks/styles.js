'use strict';
var gulp = require('gulp');
var code = require('./bindings/code');
var stack = code.loaders.stack();
var watch = false;


// Build
gulp.task('styles:build', function() {
    var data = require('./loaders/data')();
    return gulp.src('styles/**/*.scss')
        .pipe(stack.if(watch, stack.plumber(code.handlers.error)))
        .pipe(stack.sourcemaps.init())
        .pipe(stack.sass(data.stack.sass))
        .pipe(stack.autoprefixer(data.stack.autoprefixer))
        .pipe(stack.minifycss(data.stack.minifycss))
        .pipe(stack.sourcemaps.write('maps'))
        .pipe(gulp.dest('build/styles'))
});

// Watch
gulp.task('styles:watch', function() {
    gulp.watch('styles/**/*.scss', ['styles:build']);
    watch = true;
});
