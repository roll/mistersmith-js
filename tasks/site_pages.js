'use strict';
var gulp = require('gulp');
var data = require('./loaders/data');
var packages = require('./loaders/packages');


// Build
gulp.task('site:pages#build', function() {
    return gulp.src('./pages/**/*')
        .pipe(packages.frontmatter()).on("data", function(file) {
            packages.assign(file, file.frontMatter);
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
                directory: 'theme/templates',
                moment: packages.moment,
            }))
        )
        .pipe(gulp.dest('build'));
});

// Watch
gulp.task('site:pages#watch', function() {
    gulp.watch('pages/**/*', ['site:pages#build']);
});
