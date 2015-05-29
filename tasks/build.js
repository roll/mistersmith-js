'use strict';
var gulp = require('gulp');
var sequence = require('run-sequence');


// Build site
gulp.task('build', function(callback) {
    sequence(
        'build:clean',
        [
            'build:media',
            'build:pages',
            'build:theme:images',
            'build:theme:scripts',
            'build:theme:styles',
            'build:theme:vendor',
        ],
        callback
    );
});

// Build site (watch)
gulp.task('build#watch', [
    'build:media#watch',
    'build:pages#watch',
    'build:theme:images#watch',
    'build:theme:scripts#watch',
    'build:theme:styles#watch',
    'build:theme:vendor#watch',
]);
