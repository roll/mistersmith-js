'use strict';
var gulp = require('gulp');
var stack = require('./loaders/stack')();


// Config
stack.swig.setDefaults({'cache': false});

// Build
gulp.task('pages:build', function() {
    var data = require('./loaders/data')();
    return gulp.src('pages/**/*')
        .pipe(stack.frontmatter()).on('data', function(file) {
            stack.assign(file, file.frontMatter);
            file.template = file.template || file.layout;
            file.scope = file.scope;
            delete file.frontMatter;
        })
        .pipe(stack.gulpsmith()
            .metadata(data)
            .use(stack.branch()
                .pattern('**/*.md')
                .use(stack.markdown())
            )
            .use(stack.excerpts())
            .use(stack.permalinks({
                pattern: ':permalink',
                relative: false,
            }))
            .use(stack.templates({
                engine: 'swig',
                inPlace: true,
                autoescape: false,
                moment: stack.moment,
            }))
            .use(stack.templates({
                engine: 'swig',
                inPlace: false,
                autoescape: false,
                directory: 'layouts',
                moment: stack.moment,
            }))
        )
        .pipe(gulp.dest('build'));
});

// Watch
gulp.task('pages:watch', function() {
    gulp.watch('pages/**/*', ['pages:build']);
});
