'use strict';
var path = require('path');
var gulp = require('gulp');
var stack = gulp.meta.loaders.stack();
var config = gulp.meta.loaders.config();


// Default
gulp.task('default', function(callback) {
    stack.runsequence('build', 'serve', callback);
});

// Build
gulp.task('build', function(callback) {
    stack.runsequence(
        'clean', [
            'images:build',
            'pages:build',
            'scripts:build',
            'styles:build',
        ],
        callback
    );
});

// Clean
gulp.task('clean', function (callback) {
    var source = path.join(config.paths.build, config.build, '**');
    stack.del(source, callback);
});

// Deploy amazon
gulp.task('deploy-amazon', function() {
    var source = path.join(config.paths.build, config.build, '**');
    var publisher = stack.awspublish.create(config.awspublish);
    return gulp.src(source)
        .pipe(publisher.publish())
        .pipe(publisher.sync())
        .pipe(stack.awspublish.reporter());
});

// Deploy github
gulp.task('deploy-github', function() {
    var source = path.join(config.paths.build, config.build, '**');
    var filter = stack.filter('**/*.html', {restore: true});
    var basedir = config.ghpages.basedir
    return gulp.src(source)
        .pipe(filter)
        .pipe(stack.if(!!basedir, stack.replace(/="\/(?=[^\/])/g, '="'+basedir+'/')))
        .pipe(filter.restore)
        .pipe(stack.ghpages());
});

// Serve
gulp.task('serve', ['watch'], function(callback) {
    var server = path.join(config.paths.build, config.build);
    var source = path.join(server, '**');
    var params = stack.lodash.assign(
        stack.lodash.clone(config.browsersync, true), {server: server}
    );
    stack.browsersync.init(params);
    gulp.watch(source, function(file) {
        var relpath = path.relative(server, file.path);
        if (path.extname(relpath) == '.map') {
            return;
        }
        stack.browsersync.reload(relpath);
    });
    callback();
});

// Validate
gulp.task('validate', [
    'pages:validate',
    'scripts:validate',
    'styles:validate',
]);

// Watch
gulp.task('watch', [
    'images:watch',
    'pages:watch',
    'scripts:watch',
    'styles:watch',
]);
