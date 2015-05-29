'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass')
var browsersync = require('browser-sync').create();


// Compile sass into CSS & auto-inject into browsers
gulp.task('build:theme:styles', function() {
    return gulp.src('theme/styles/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('build/theme/styles'))
        .pipe(browsersync.stream());
});

// Build theme styles (watch)
gulp.task('build:theme:styles#watch', function() {
    gulp.watch('theme/styles/**/*', ['build:theme:styles']);
});
