'use strict';
var gulp = require('gulp');
var gutil = require('gulp-util');
var coffee = require('gulp-coffee');


// Build theme scripts
gulp.task('build:theme:scripts', function() {
    return gulp.src('theme/scripts/**/*.coffee')
        .pipe(coffee({bare: true}).on('error', gutil.log))
        .pipe(gulp.dest('build/theme/scripts'));
});

// Build theme scripts (watch)
gulp.task('build:theme:scripts#watch', function() {
    gulp.watch('theme/scripts/**/*', ['build:theme:scripts']);
});
