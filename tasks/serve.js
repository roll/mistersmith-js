'use strict';
var gulp = require('gulp');
var browsersync = require('browser-sync').create();
var config = require('./loaders/config');


// Static Server & watching scss/html files
gulp.task('serve', ['build', 'build#watch'], function() {
    browsersync.init(config.browsersync);
    gulp.watch('build/**/*', browsersync.reload);
});
