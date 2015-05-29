'use strict';
var gulp = require('gulp');


// Build project
gulp.task('build', [
     'build:media',
     'build:pages',
     'build:theme:images',
     'build:theme:scripts',
     'build:theme:styles',
     'build:theme:vendor',
]);
