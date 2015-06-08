'use strict';
var gulp = require('gulp');
var code = require('./bindings/code');
var stack = code.loaders.stack();
var watch = false;


// Build
gulp.task('scripts:build', function() {
    var data = require('./loaders/data')();
    return gulp.src('scripts/**/*.coffee')
        .pipe(stack.if(watch, stack.plumber(code.handlers.error)))
        .pipe(stack.sourcemaps.init())
        .pipe(stack.coffee(data.stack.coffee))
        .pipe(stack.concat('main.js'))
        .pipe(stack.uglify())
        .pipe(stack.sourcemaps.write('maps'))
        .pipe(gulp.dest('build/scripts'));
});

// Watch
gulp.task('scripts:watch', function() {
    gulp.watch('scripts/**/*.coffee', ['scripts:build']);
    watch = true;
});
