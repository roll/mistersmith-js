'use strict';
var gulp = require('gulp');
var config = require('./loaders/config')();
var packages = require('./loaders/packages')();


// Build
gulp.task('styles:build', function() {
    return gulp.src('styles/*.scss')
        .pipe(packages.sass())
        .pipe(packages.autoprefixer(config.autoprefixer))
        .pipe(gulp.dest('build/styles'))
});

// Watch
gulp.task('styles:watch', function() {
    gulp.watch('styles/**/*', ['styles:build']);
});
