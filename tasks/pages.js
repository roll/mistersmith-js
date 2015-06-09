'use strict';
var gulp = require('gulp');
var code = require('./bindings/code');
var stack = code.loaders.stack();
var watch = false;


// Build
gulp.task('pages:build', function() {
    var data = code.loaders.data();
    var env = stack.nunjucks.configure('layouts', data.stack.nunjucks);
    env.addGlobal('lodash', stack.lodash);
    env.addGlobal('moment', stack.moment);
    return gulp.src('pages/**')
        .pipe(stack.frontmatter()).on('data', function(file) {
            stack.lodash.assign(file, file.frontMatter);
            file.template = file.template || file.layout;
            file.scope = file.scope;
            delete file.frontMatter;
        })
        //Plumber doesn't work before frontmatter
        .pipe(stack.if(watch, stack.plumber(code.handlers.error)))
        .pipe(stack.gulpsmith()
            .metadata(data)
            .use(stack.metallic())
            .use(stack.wordcount())
            .use(stack.markdown(data.stack.markdown))
            // .use(code.plugins.headings())
            .use(stack.headings('h2,h3'))
            .use(stack.excerpts())
            .use(code.plugins.permalinks({
                relative: false,
                pattern: ':permalink',
                replace: /^\/|\/$/,
                separator: '-',
            }))
            .use(code.plugins.pages())
            .use(stack.templates({
                inPlace: true,
                engine: 'nunjucks',
            }))
            .use(stack.templates({
                inPlace: false,
                engine: 'nunjucks',
                directory: 'layouts',
            }))
        )
        .pipe(gulp.dest('build'));
});

// Watch
gulp.task('pages:watch', function() {
    gulp.watch('pages/**', ['pages:build']);
    watch = true;
});
