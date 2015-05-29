'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass')
var browsersync = require('browser-sync').create();


// Build
gulp.task('site:theme:styles#build', function() {
    return gulp.src('theme/styles/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('build/theme/styles'))
        .pipe(browsersync.stream());
});

// Watch
gulp.task('site:theme:styles#watch', function() {
    gulp.watch('theme/styles/**/*', ['site:theme:styles#build']);
});
