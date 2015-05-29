'use strict';
var gulp = require('gulp');
require('require-dir')('./tasks');


// Default
gulp.task('default', [
    'site:serve',
]);
