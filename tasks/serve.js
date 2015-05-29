'use strict';
var gulp = require('gulp');
var browsersync = require('browser-sync').create();
var config = require('./loaders/config');


// Static Server & watching scss/html files
gulp.task('serve', ['build'], function() {

    // Init browsersync
    browsersync.init(config.browsersync);

    // Start watching
    gulp.watch('media/**/*', ['build:media']);
    gulp.watch('pages/**/*', ['build:pages']);
    gulp.watch('theme/images/**/*', ['build:theme:images']);
    gulp.watch('theme/scripts/**/*', ['build:theme:scripts']);
    gulp.watch('theme/styles/**/*', ['build:theme:styles']);
    gulp.watch('theme/vendor/**/*', ['build:theme:vendor']);
    gulp.watch('build/**/*', browsersync.reload);

});
