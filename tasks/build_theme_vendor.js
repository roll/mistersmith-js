'use strict';
var gulp = require('gulp');


// Copy vendor code
gulp.task('build:theme:vendor', ['build:clean'], function() {
    return gulp.src('theme/vendor/**/*')
        .pipe(gulp.dest('build/theme/vendor'));
});
