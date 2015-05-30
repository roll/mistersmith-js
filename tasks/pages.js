'use strict';
var gulp = require('gulp');
var packages = require('../loaders/packages')();


// Config
packages.swig.setDefaults({'cache': false});

// Build
gulp.task('pages:build', function() {
    var data = require('../loaders/data')();
    return gulp.src('pages/**/*')
        .pipe(packages.frontmatter()).on("data", function(file) {
            packages.assign(file, file.frontMatter);
            file.template = file.template || file.layout;
            file.scope = file.scope;
            delete file.frontMatter;
        })
        .pipe(packages.gulpsmith()
            .metadata(data)
            .use(packages.branch()
                .pattern('.md')
                .use(packages.markdown())
            )
            .use(packages.excerpts())
            .use(packages.permalinks({
                pattern: ':permalink',
                relative: false,
            }))
            .use(packages.templates({
                engine: 'swig',
                inPlace: true,
                autoescape: false,
                moment: packages.moment,
            }))
            .use(packages.templates({
                engine: 'swig',
                inPlace: false,
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
