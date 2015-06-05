'use strict';
var gulp = require('gulp');
var error = require('./handlers/error');
var stack = require('./loaders/stack')();
var watch = false;


// Build
gulp.task('scripts:build', function() {
    var data = require('./loaders/data')();
    return gulp.src('scripts/**/*.coffee')
        .pipe(stack.if(watch, stack.plumber(error)))
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
