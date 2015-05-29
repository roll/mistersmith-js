'use strict';
var gulp = require('gulp');


// Build
gulp.task('site:theme:vendor#build', function() {
    return gulp.src('theme/vendor/**/*')
        .pipe(gulp.dest('build/theme/vendor'));
});

// Watch
gulp.task('site:theme:vendor#watch', function() {
    gulp.watch('theme/vendor/**/*', ['site:theme:vendor#build']);
});
