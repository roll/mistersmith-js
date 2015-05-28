var gulp = require('gulp');
var sass = require('gulp-sass')
var browsersync = require('browser-sync').create();
var del = require('del');


// Clean build directory
gulp.task('clean', function () {
    del(['build/**/*']);
});

// Copy images
gulp.task('images', function() {
    return gulp.src('images/**/*')
        .pipe(gulp.dest('build/images'))
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('styles', function() {
    return gulp.src('styles/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('build/styles'))
        .pipe(browsersync.stream());
});

// Copy vendor code
gulp.task('vendor', function() {
    return gulp.src('vendor/**/*')
        .pipe(gulp.dest('build/vendor'))
});

// Static Server & watching scss/html files
gulp.task('serve', ['sass'], function() {
    browsersync.init({
        server: 'build'
    });
    gulp.watch('styles/*.scss', ['styles']);
    gulp.watch('views/*.html').on('change', browsersync.reload);
});


gulp.task('build', ['clean', 'images', 'styles', 'vendor']);
gulp.task('default', ['serve']);
