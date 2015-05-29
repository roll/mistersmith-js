'use strict';
var gulp = require('gulp');


// Watch
gulp.task('site:theme:templates#watch', function() {
    gulp.watch('theme/templates/**/*', ['site:pages#build']);
});
