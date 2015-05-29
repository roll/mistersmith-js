'use strict';
var gulp = require('gulp');
var config = require('./loaders/config');
var packages = require('./loaders/packages');


// Build
gulp.task('site:build', function(callback) {
    packages.runsequence(
        'site:clean',
        [
            'media:build',
            'pages:build',
            'images:build',
            'scripts:build',
            'styles:build',
            'vendor:build',
        ],
        callback
    );
});

// Clean
gulp.task('site:clean', function (callback) {
    packages.del(['build/**/*'], callback);
});

// Serve
gulp.task('site:serve', ['site:build', 'site:watch'], function() {
    packages.browsersync.init(config.browsersync);
    gulp.watch('build/**/*', packages.browsersync.reload);
});

// Watch
gulp.task('site:watch', [
    'data:watch',
    'media:watch',
    'pages:watch',
    'images:watch',
    'scripts:watch',
    'styles:watch',
    'vendor:watch',
]);
