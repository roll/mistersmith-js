'use strict';
var gulp = require('gulp');


// Build
gulp.task('site:media#build', function() {
    return gulp.src('media/**/*')
        .pipe(gulp.dest('build/media'));
});

// Watch
gulp.task('site:media#watch', function() {
    gulp.watch('media/**/*', ['site:media#build']);
});
