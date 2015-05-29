'use strict';
var gulp = require('gulp');
var packages = require('./loaders/packages');


// Build
gulp.task('site:theme:styles#build', function() {
    return gulp.src('theme/styles/*.scss')
        .pipe(packages.sass())
        .pipe(gulp.dest('build/theme/styles'))
});

// Watch
gulp.task('site:theme:styles#watch', function() {
    gulp.watch('theme/styles/**/*', ['site:theme:styles#build']);
});
