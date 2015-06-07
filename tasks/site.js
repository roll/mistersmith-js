'use strict';
var path = require('path');
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
    stack.del(['build/**'], callback);
});

gulp.task('site:serve', function(callback) {
    stack.runsequence(
        'site:build',
        'site:watch',
        function() {
            var data = require('./loaders/data')();
            stack.browsersync.init(data.stack.browsersync);
            gulp.watch('build/**', function(file) {
                var relpath = path.relative('build', file.path);
                if (path.extname(relpath) == '.map') return;
                stack.browsersync.reload(relpath);
            });
            callback();
        }
    );
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
