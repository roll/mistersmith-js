'use strict';
var del = require('del');
var gulp = require('gulp');
var sequence = require('run-sequence');
var browsersync = require('browser-sync').create();
var config = require('./loaders/config');


// Build
gulp.task('site#build', function(callback) {
    sequence(
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
    del(['build/**/*'], callback);
});

// Serve
gulp.task('site#serve', ['site#build', 'site#watch'], function() {
    browsersync.init(config.browsersync);
    gulp.watch('build/**/*', browsersync.reload);
});

// Watch
gulp.task('site#watch', [
    'site:media#watch',
    'site:pages#watch',
    'site:theme:images#watch',
    'site:theme:scripts#watch',
    'site:theme:styles#watch',
    'site:theme:vendor#watch',
]);
