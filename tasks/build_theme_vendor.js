'use strict';
var gulp = require('gulp');


// Copy vendor code
gulp.task('build:theme:vendor', ['clean'], function() {
    return gulp.src('theme/vendor/**/*')
        .pipe(gulp.dest('build/theme/vendor'));
});
