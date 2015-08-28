'use strict';
var path = require('path');
var gulp = require('gulp');
var stack = gulp.meta.loaders.stack();
var config = gulp.meta.loaders.config();
var watch = false;


// Build
gulp.task('scripts:build', function() {
    var source = path.join(config.paths.scripts, '**/*.js');
    var target = path.join(config.paths.build, config.build, config.paths.scripts)
    var data = gulp.meta.loaders.data();
    return gulp.src(source)
        .pipe(stack.if(watch, stack.plumber(gulp.meta.handlers.error)))
        .pipe(stack.sourcemaps.init())
        .pipe(stack.babel())
        .pipe(stack.concat('main.js'))
        .pipe(stack.if(config.build === 'product', stack.uglify()))
        .pipe(stack.sourcemaps.write('maps'))
        .pipe(gulp.dest(target));
});

// Validate
gulp.task('scripts:validate', function() {
    var source = path.join(config.paths.build, config.build, '**/*.js');
    return gulp.src(source)
        .pipe(stack.jshint())
        .pipe(stack.jshint.reporter('default'));
});

// Watch
gulp.task('scripts:watch', function() {
    var source = path.join(config.paths.scripts, '**/*.js');
    gulp.watch(source, ['scripts:build']);
    watch = true;
});
