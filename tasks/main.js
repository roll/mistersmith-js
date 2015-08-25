'use strict';
var path = require('path');
var gulp = require('gulp');
var code = require('./bindings/code');
var stack = code.loaders.stack();


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

// Deploy (guthub)
gulp.task('deploy-github', function() {
    var data = code.loaders.data();
    var filter = stack.filter('**/*.html')
    var basedir = data.stack.ghpages.basedir
    return gulp.src('build/**')
        .pipe(filter)
        .pipe(stack.replace(/="\/(?=[^\/])/g, '="'+basedir+'/'))
        .pipe(filter.restore())
        .pipe(stack.ghpages())
});

// Deploy (amazon)
gulp.task('deploy-amazon', function() {
    var data = code.loaders.data();
    var publisher = stack.awspublish.create(data.stack.awspublish);
    return gulp.src('build/**')
        .pipe(publisher.publish())
        .pipe(publisher.sync())
        .pipe(stack.awspublish.reporter())
});

// Serve
gulp.task('serve', ['watch'], function(callback) {
    var data = code.loaders.data();
    stack.browsersync.init(data.stack.browsersync);
    gulp.watch('build/**', function(file) {
        var relpath = path.relative('build', file.path);
        if (path.extname(relpath) == '.map') return;
        stack.browsersync.reload(relpath);
    });
    callback();
});

// Watch
gulp.task('watch', [
    'data:watch',
    'images:watch',
    'layouts:watch',
    'pages:watch',
    'scripts:watch',
    'styles:watch',
]);
