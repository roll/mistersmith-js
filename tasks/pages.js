'use strict';
var gulp = require('gulp');
var stack = gulp.meta.loaders.stack();
var config = gulp.meta.loaders.config();
var watch = false;


// Build
gulp.task('pages:build', function() {
    var data = gulp.meta.loaders.data();
    var env = stack.nunjucks.configure('layouts', config.nunjucks);
    return gulp.src('pages/**')
        .pipe(stack.frontmatter()).on('data', function(file) {
            stack.lodash.assign(file, file.frontMatter);
            file.template = file.template || file.layout;
            delete file.frontMatter;
        })
        //Plumber doesn't work before frontmatter
        .pipe(stack.if(watch, stack.plumber(gulp.meta.handlers.error)))
        .pipe(stack.gulpsmith()
            .metadata({
                data: data,
                stack: stack,
                config: config,
            })
            .use(stack.metallic())
            .use(stack.wordcount())
            .use(stack.markdown(config.markdown))
            .use(stack.headings('h2,h3'))
            .use(stack.excerpts())
            .use(stack.slug({
                property: 'title',
                patterns: ['*.html', '*.md'],
                renameFiles: false,
                lower: true,
                remove: /[.]/g,
            }))
            .use(gulp.meta.plugins.links({
                relative: false,
                pattern: ':permalink',
                replace: /^\/|\/$/,
                separator: '-',
            }))
            .use(gulp.meta.plugins.pages())
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

// Validate
gulp.task('pages:validate', function() {
    return gulp.src('build/**/*.css')
        .pipe(stack.w3cjs());
});

// Watch
gulp.task('pages:watch', function() {
    gulp.watch(['data/**', 'layouts/**', 'pages/**'], ['pages:build']);
    watch = true;
});
