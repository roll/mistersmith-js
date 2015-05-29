'use strict';
var gulp = require('gulp');
var config = require('./loaders/config');
var packages = require('./loaders/packages');


// Build
gulp.task('site#build', function(callback) {
    packages.runsequence(
        'site#clean',
        [
            'site:media#build',
            'site:pages#build',
            'site:theme:images#build',
            'site:theme:scripts#build',
            'site:theme:styles#build',
            'site:theme:vendor#build',
        ],
        callback
    );
});

// Clean
gulp.task('site#clean', function (callback) {
    packages.del(['build/**/*'], callback);
});

// Serve
gulp.task('site#serve', ['site#build', 'site#watch'], function() {
    packages.browsersync.init(config.browsersync);
    gulp.watch('build/**/*', packages.browsersync.reload);
});

// Watch
gulp.task('site#watch', [
    'site:data#watch',
    'site:media#watch',
    'site:pages#watch',
    'site:theme:images#watch',
    'site:theme:scripts#watch',
    'site:theme:styles#watch',
    'site:theme:vendor#watch',
]);
