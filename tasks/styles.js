'use strict';
var gulp = require('gulp');
var stack = gulp.meta.loaders.stack();
var config = gulp.meta.loaders.config();
var watch = false;


// Build
gulp.task('styles:build', function() {
    var data = gulp.meta.loaders.data();
    return gulp.src('styles/**/*.scss')
        .pipe(stack.if(watch, stack.plumber(gulp.meta.handlers.error)))
        .pipe(stack.sourcemaps.init())
        .pipe(stack.sass(config.sass))
        .pipe(stack.autoprefixer(config.autoprefixer))
        .pipe(stack.minifycss(config.minifycss))
        .pipe(stack.sourcemaps.write('maps'))
        .pipe(gulp.dest('build/styles'))
});

// Validate
gulp.task('styles:validate', function() {
    //TODO: enable reporting
    return gulp.src('build/**/*.css')
        .pipe(stack.w3ccss());
});

// Watch
gulp.task('styles:watch', function() {
    gulp.watch('styles/**/*.scss', ['styles:build']);
    watch = true;
});
