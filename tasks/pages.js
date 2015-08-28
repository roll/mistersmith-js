'use strict';
var path = require('path');
var gulp = require('gulp');
var stack = gulp.meta.loaders.stack();
var config = gulp.meta.loaders.config();
var watch = false;


// Build
gulp.task('pages:build', function() {
    var source = path.join(config.paths.pages, '**');
    var target = path.join(config.paths.build, config.build);
    var render = stack.nunjucks.configure(config.paths.layouts, config.nunjucks);
    var data = gulp.meta.loaders.data();
    return gulp.src(source)
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
        .pipe(gulp.dest(target));
});

// Validate
gulp.task('pages:validate', function() {
    var source = path.join(config.paths.build, config.build, '**/*.html');
    return gulp.src(source)
        .pipe(stack.w3cjs());
});

// Watch
gulp.task('pages:watch', function() {
    var source = [
        path.join(config.paths.data, '**'),
        path.join(config.paths.layouts, '**'),
        path.join(config.paths.pages, '**'),
    ];
    gulp.watch(source, ['pages:build']);
    watch = true;
});
