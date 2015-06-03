'use strict';
var gulp = require('gulp');
var stack = require('./loaders/stack')();


// Build
gulp.task('scripts:build', function() {
    return gulp.src('scripts/**/*.coffee')
        .pipe(stack.sourcemaps.init())
        .pipe(stack.coffee({bare: true}).on('error', stack.util.log))
        .pipe(stack.concat('main.js'))
        .pipe(stack.uglify())
        .pipe(stack.sourcemaps.write('maps'))
        .pipe(gulp.dest('build/scripts'));
});

// Watch
gulp.task('scripts:watch', function() {
    gulp.watch('scripts/**/*', ['scripts:build']);
});
