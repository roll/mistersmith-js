'use strict';
var gulp = require('gulp');


// Watch
gulp.task('site:data#watch', function() {
    gulp.watch('data/**/*', ['site:pages#build']);
});
