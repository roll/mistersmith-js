'use strict';
var gulp = require('gulp');


// Build media
gulp.task('build:media', function() {
    return gulp.src('media/**/*')
        .pipe(gulp.dest('build/media'));
});

// Build media (watch)
gulp.task('build:media#watch', function() {
    gulp.watch('media/**/*', ['build:media']);
});
