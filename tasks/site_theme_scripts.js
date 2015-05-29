'use strict';
var gulp = require('gulp');
var gutil = require('gulp-util');
var coffee = require('gulp-coffee');


// Build
gulp.task('site:theme:scripts#build', function() {
    return gulp.src('theme/scripts/**/*.coffee')
        .pipe(coffee({bare: true}).on('error', gutil.log))
        .pipe(gulp.dest('build/theme/scripts'));
});

// Watch
gulp.task('site:theme:scripts#watch', function() {
    gulp.watch('theme/scripts/**/*', ['site:theme:scripts#build']);
});
