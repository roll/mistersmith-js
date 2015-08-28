'use strict';
var path = require('path');
var gulp = require('gulp');
var stack = gulp.meta.loaders.stack();
var config = gulp.meta.loaders.config();
var watch = false;


// Build
gulp.task('images:build', function() {
    var source = path.join(config.paths.images, '**');
    var target = path.join(config.paths.build, config.build, config.paths.images)
    var cache = [config.name, config.build].join('-');
    return gulp.src(source)
        .pipe(stack.if(watch, stack.plumber(gulp.meta.handlers.error)))
        .pipe(stack.if(config.build === 'product',
            stack.cache(stack.imagemin(config.imagemin), {name: cache})
        ))
        .pipe(gulp.dest(target));
});

// Watch
gulp.task('images:watch', function() {
    var source = path.join(config.paths.images, '**');
    gulp.watch(source, ['images:build']);
    watch = true;
});
