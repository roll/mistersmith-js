'use strict';
var path = require('path');
var gulp = require('gulp');
var stack = gulp.meta.loaders.stack();
var config = gulp.meta.loaders.config();
var watch = false;


// Build
gulp.task('styles:build', function() {
    var source = path.join(config.paths.styles, '**/*.scss');
    var target = path.join(config.paths.build, config.build, config.paths.styles)
    var data = gulp.meta.loaders.data();
    return gulp.src(source)
        .pipe(stack.if(watch, stack.plumber(gulp.meta.handlers.error)))
        .pipe(stack.sourcemaps.init())
        .pipe(stack.sass(config.sass))
        .pipe(stack.autoprefixer(config.autoprefixer))
        .pipe(stack.if(config.build === 'product', stack.minifycss(config.minifycss)))
        .pipe(stack.sourcemaps.write('maps'))
        .pipe(gulp.dest(target))
});

// Validate TODO: enable reporting
gulp.task('styles:validate', function() {
    var source = path.join(config.paths.build, config.build, '**/*.scss');
    return gulp.src(source)
        .pipe(stack.w3ccss());
});

// Watch
gulp.task('styles:watch', function() {
    var source = path.join(config.paths.styles, '**/*.scss');
    gulp.watch(source, ['styles:build']);
    watch = true;
});
