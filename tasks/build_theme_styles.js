'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass')
var browsersync = require('browser-sync').create();


// Compile sass into CSS & auto-inject into browsers
gulp.task('build:theme:styles', ['clean'], function() {
    return gulp.src('theme/styles/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('build/theme/styles'))
        .pipe(browsersync.stream());
});
