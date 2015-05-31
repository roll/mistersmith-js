'use strict';
var gulp = require('gulp');
var stack = require('./loaders/stack')();


// Build
gulp.task('styles:build', function() {
    var config = require('./loaders/data')({'key': 'stack'});
    return gulp.src('styles/**/*.scss')
        .pipe(stack.sourcemaps.init())
        .pipe(stack.sass(config.sass))
        .pipe(stack.autoprefixer(config.autoprefixer))
        .pipe(stack.minifycss(config.minifycss))
        .pipe(stack.sourcemaps.write('maps'))
        .pipe(gulp.dest('build/styles'))
});

// Watch
gulp.task('styles:watch', function() {
    gulp.watch('styles/**/*', ['styles:build']);
});
