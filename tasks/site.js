'use strict';
var gulp = require('gulp');
var stack = require('./loaders/stack')();


// Build
gulp.task('site:build', function(callback) {
    stack.runsequence(
        'site:clean',
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
gulp.task('site:clean', function (callback) {
    stack.del(['build/**/*'], callback);
});

// Serve
gulp.task('site:serve', ['site:build', 'site:watch'], function() {
    var config = require('./loaders/data')({'key': 'stack'});
    stack.browsersync.init(config.browsersync);
    gulp.watch('build/**/*', stack.browsersync.reload);
});

// Watch
gulp.task('site:watch', [
    'data:watch',
    'images:watch',
    'layouts:watch',
    'pages:watch',
    'scripts:watch',
    'styles:watch',
]);
