'use strict';
var gulp = require('gulp');


// Build
gulp.task('site:theme:images#build', function() {
    return gulp.src('theme/images/**/*')
        .pipe(gulp.dest('build/theme/images'));
});

// Watch
gulp.task('site:theme:images#watch', function() {
    gulp.watch('theme/images/**/*', ['site:theme:images#build']);
});
