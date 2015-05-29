'use strict';
var gulp = require('gulp');
var browsersync = require('browser-sync').create();


// Static Server & watching scss/html files
gulp.task('serve', ['build'], function() {
    browsersync.init({
        server: 'build'
    });
    gulp.watch('styles/*.scss', ['styles']);
    gulp.watch('views/*.html').on('change', browsersync.reload);
});
