var gulp = require('gulp');
var sass = require('gulp-sass')
var browsersync = require('browser-sync').create();

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {
    browsersync.init({
        server: "build"
    });
    gulp.watch("styles/*.scss", ['sass']);
    gulp.watch("examples/*.html").on('change', browsersync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("styles/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("styles/build"))
        .pipe(browsersync.stream());
});

gulp.task('default', ['serve']);
