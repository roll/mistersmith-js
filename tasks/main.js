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
        'clean',
        [
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

// Deploy
gulp.task('deploy', function(callback) {
    return gulp.src('build/**')
        .pipe(stack.ghpages())
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
