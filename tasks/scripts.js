'use strict';
var gulp = require('gulp');
var stack = require('./loaders/stack')();


// Build
gulp.task('scripts:build', function() {
    return gulp.src('scripts/**/*.coffee')
        .pipe(stack.coffee({bare: true}).on('error', stack.util.log))
        .pipe(gulp.dest('build/scripts'));
});

// Watch
gulp.task('scripts:watch', function() {
    gulp.watch('scripts/**/*', ['scripts:build']);
});
