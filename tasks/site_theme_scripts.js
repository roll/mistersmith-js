'use strict';
var gulp = require('gulp');
var packages = require('./loaders/packages');


// Build
gulp.task('site:theme:scripts#build', function() {
    return gulp.src('theme/scripts/**/*.coffee')
        .pipe(packages.coffee({bare: true}).on('error', packages.util.log))
        .pipe(gulp.dest('build/theme/scripts'));
});

// Watch
gulp.task('site:theme:scripts#watch', function() {
    gulp.watch('theme/scripts/**/*', ['site:theme:scripts#build']);
});
