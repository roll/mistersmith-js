'use strict';
var gulp = require('gulp');
var data = require('../loaders/data');
var packages = require('../loaders/packages');


// Build
gulp.task('pages:build', function() {
    return gulp.src('pages/**/*')
        .pipe(packages.frontmatter()).on("data", function(file) {
            packages.assign(file, file.frontMatter);
            file.template = file.template || file.layout || 'base.html';
            delete file.frontMatter;
        })
        .pipe(packages.gulpsmith()
            .metadata(data)
            .use(packages.markdown())
            .use(packages.excerpts())
            .use(packages.permalinks({
                pattern: ':permalink',
                relative: false,
            }))
            .use(packages.templates({
                engine: 'swig',
                autoescape: false,
                directory: 'layouts',
                moment: packages.moment,
            }))
        )
        .pipe(gulp.dest('build'));
});

// Watch
gulp.task('pages:watch', function() {
    gulp.watch('pages/**/*', ['pages:build']);
});
