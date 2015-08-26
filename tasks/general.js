'use strict';
var path = require('path');
var gulp = require('gulp');
var stack = gulp.meta.loaders.stack();
var config = gulp.meta.loaders.config();


// Default
gulp.task('default', function(callback) {
    stack.runsequence('build', 'serve', callback);
});

// Build
gulp.task('build', function(callback) {
    stack.runsequence(
        'clean', [
            'images:build',
            'pages:build',
            'scripts:build',
            'styles:build',
        ],
        callback
    );
});

// Clean
gulp.task('clean', function (callback) {
    stack.del(['build/**'], callback);
});

// Deploy amazon
gulp.task('deploy-amazon', function() {
    var publisher = stack.awspublish.create(config.awspublish);
    return gulp.src('build/**')
        .pipe(publisher.publish())
        .pipe(publisher.sync())
        .pipe(stack.awspublish.reporter());
});

// Deploy github
gulp.task('deploy-github', function() {
    var filter = stack.filter('**/*.html')
    var basedir = config.ghpages.basedir
    return gulp.src('build/**')
        .pipe(filter)
        .pipe(stack.if(basedir, stack.replace(/="\/(?=[^\/])/g, '="'+basedir+'/')))
        .pipe(filter.restore())
        .pipe(stack.ghpages());
});

// Serve
gulp.task('serve', ['watch'], function(callback) {
    stack.browsersync.init(config.browsersync);
    gulp.watch('build/**', function(file) {
        var relpath = path.relative('build', file.path);
        if (path.extname(relpath) == '.map') return;
        stack.browsersync.reload(relpath);
    });
    callback();
});

// Validate
gulp.task('validate', [
    'pages:validate',
    'scripts:validate',
    'styles:validate',
]);

// Watch
gulp.task('watch', [
    'images:watch',
    'pages:watch',
    'scripts:watch',
    'styles:watch',
]);
