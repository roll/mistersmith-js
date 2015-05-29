'use strict';
var gulp = require('gulp');
var packages = require('./loaders/packages');


// Build
gulp.task('scripts:build', function() {
    return gulp.src('scripts/**/*.coffee')
        .pipe(packages.coffee({bare: true}).on('error', packages.util.log))
        .pipe(gulp.dest('build/scripts'));
});

// Watch
gulp.task('scripts:watch', function() {
    gulp.watch('scripts/**/*', ['scripts:build']);
});
