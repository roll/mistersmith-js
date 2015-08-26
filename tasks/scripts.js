'use strict';
var gulp = require('gulp');
var stack = gulp.meta.loaders.stack();
var config = gulp.meta.loaders.config();
var watch = false;


// Build
gulp.task('scripts:build', function() {
    var data = gulp.meta.loaders.data();
    var filter = stack.filter('**/*.coffee')
    return gulp.src('scripts/**/*.{js,coffee}')
        .pipe(stack.if(watch, stack.plumber(gulp.meta.handlers.error)))
        .pipe(stack.sourcemaps.init())
        .pipe(filter)
        .pipe(stack.coffee(config.coffee))
        .pipe(filter.restore())
        .pipe(stack.concat('main.js'))
        .pipe(stack.uglify())
        .pipe(stack.sourcemaps.write('maps'))
        .pipe(gulp.dest('build/scripts'));
});

// Validate
gulp.task('scripts:validate', function() {
    return gulp.src('build/**/*.js')
        .pipe(stack.jshint())
        .pipe(stack.jshint.reporter('default'));
});

// Watch
gulp.task('scripts:watch', function() {
    gulp.watch('scripts/**/*.{js,coffee}', ['scripts:build']);
    watch = true;
});
