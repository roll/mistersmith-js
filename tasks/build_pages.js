'use strict';
var gulp = require('gulp');
var gsmith = require('gulpsmith');
var matter = require('gulp-front-matter');
var branch = require('metalsmith-branch');
var collections = require('metalsmith-collections');
var markdown = require('metalsmith-markdown');
var excerpts = require('metalsmith-excerpts');
var permalinks = require('metalsmith-permalinks');
var templates = require('metalsmith-templates');
var assign = require('lodash.assign');
var moment = require('moment');
var data = require('./loaders/data');


// Build pages
gulp.task('build:pages', ['build:clean'], function() {
    return gulp.src('./pages/**/*')
        .pipe(matter()).on("data", function(file) {
            assign(file, file.frontMatter);
            delete file.frontMatter;
        })
        .pipe(gsmith()
            .metadata(data)
            .use(markdown())
            .use(excerpts())
            .use(permalinks({
                pattern: ':permalink',
                relative: false,
            }))
            .use(templates({
                engine: 'swig',
                autoescape: false,
                directory: 'theme/templates',
                moment: moment,
            }))
        )
        .pipe(gulp.dest('build'));
});
