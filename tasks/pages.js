'use strict';
var gulp = require('gulp');
var error = require('./handlers/error');
var stack = require('./loaders/stack')();
var pages = require('./plugins/pages');
var headings = require('./plugins/headings');
var watch = false;


// Build
gulp.task('pages:build', function() {
    var data = require('./loaders/data')();
    stack.nunjucks.configure('layouts', data.stack.nunjucks);
    return gulp.src('pages/**/*.*')
        .pipe(stack.frontmatter()).on('data', function(file) {
            stack.assign(file, file.frontMatter);
            file.template = file.template || file.layout;
            file.scope = file.scope;
            delete file.frontMatter;
        })
        //Plumber doesn't work before frontmatter
        .pipe(stack.if(watch, stack.plumber(error)))
        .pipe(stack.gulpsmith()
            .metadata(data)
            .use(stack.metallic())
            .use(stack.wordcount())
            .use(stack.markdown(data.stack.markdown))
            .use(headings())
            .use(stack.excerpts())
            .use(stack.permalinks({
                pattern: ':permalink',
                relative: false,
            }))
            .use(pages())
            .use(stack.templates({
                engine: 'nunjucks',
                inPlace: true,
                moment: stack.moment,
            }))
            .use(stack.templates({
                engine: 'nunjucks',
                inPlace: false,
                directory: 'layouts',
                moment: stack.moment,
            }))
        )
        .pipe(gulp.dest('build'));
});

// Watch
gulp.task('pages:watch', function() {
    gulp.watch('pages/**/*.*', ['pages:build']);
    watch = true;
});
