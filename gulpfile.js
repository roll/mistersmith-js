'use strict';
var gulp = require('gulp');


// Register
require('require-dir')('./tasks');

// Default
gulp.task('default', [
    'site:serve',
]);
