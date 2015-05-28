var gulp = require('gulp');
var sass = require('gulp-sass')
var gutil = require('gulp-util');
var gsmith = require('gulpsmith');
var coffee = require('gulp-coffee');
var matter = require('gulp-front-matter');
var branch = require('metalsmith-branch');
var collections = require('metalsmith-collections');
var markdown = require('metalsmith-markdown');
var excerpts = require('metalsmith-excerpts');
var permalinks = require('metalsmith-permalinks');
var templates = require('metalsmith-templates');
var browsersync = require('browser-sync').create();
var assign = require('lodash.assign');
var moment = require('moment');
var yaml = require('js-yaml');
var del = require('del');
var fs = require('fs');


// Default task
gulp.task('default', [
    'serve',
]);

// Static Server & watching scss/html files
gulp.task('serve', ['build'], function() {
    browsersync.init({
        server: 'build'
    });
    gulp.watch('styles/*.scss', ['styles']);
    gulp.watch('views/*.html').on('change', browsersync.reload);
});

// Build project
gulp.task('build', [
     'build:clean',
     'build:images',
     'build:pages',
     'build:scripts',
     'build:styles',
     'build:vendor',
]);

// Clean build directory
gulp.task('build:clean', function () {
    del(['build/**/*']);
});

// Copy images
gulp.task('build:images', function() {
    return gulp.src('images/**/*')
        .pipe(gulp.dest('build/images'));
});

// Build pages
gulp.task('build:pages', function() {
    return gulp.src('./pages/**/*')
        .pipe(matter()).on("data", function(file) {
            assign(file, file.frontMatter);
            delete file.frontMatter;
        })
        .pipe(gsmith()
            .metadata({
                site: yaml.load(fs.readFileSync('metadata/site.yaml')),
            })
            .use(markdown())
            .use(excerpts())
            .use(templates({
                engine: 'swig',
                autoescape: false,
                directory: 'templates',
                moment: moment,
            }))
        )
        .pipe(gulp.dest('build'));
});

// Compile scripts
gulp.task('build:scripts', function() {
    return gulp.src('scripts/**/*.coffee')
        .pipe(coffee({bare: true}).on('error', gutil.log))
        .pipe(gulp.dest('build/scripts'));
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('build:styles', function() {
    return gulp.src('styles/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('build/styles'))
        .pipe(browsersync.stream());
});

// Copy vendor code
gulp.task('build:vendor', function() {
    return gulp.src('vendor/**/*')
        .pipe(gulp.dest('build/vendor'));
});
