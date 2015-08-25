'use strict';
var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var glob = require('glob');
var yaml = require('js-yaml');
var gutil = require('gulp-util');
var reqdir = require('require-dir');
var loader = require('gulp-load-plugins');


// Register meta
gulp.meta = {
    globals: reqdir('tasks/globals'),
    plugins: reqdir('tasks/plugins'),
    loaders: {
        config: function(options) {
            var config = yaml.load(fs.readFileSync('config.yml'));
            if (options && options.key) {
                return config[options.key];
            }
            return config;
        },
        data: function(options) {
            var data = {};
            var files = glob.sync('data/**/*.*');
            files.forEach(function(file) {
                var rpath = path.relative('data', file);
                var parts = rpath.split(path.sep);
                var scope = data;
                parts.forEach(function(part, index) {
                    if (index < parts.length - 1) {
                        scope[part] = scope[part] || {};
                        scope = scope[part];
                    } else {
                        var id = path.basename(part, '.yml');
                        var data = yaml.load(fs.readFileSync(file));
                        data.id = data.id || id;
                        scope[id] = data;
                    }
                });
            });
            if (options && options.key) {
                return data[options.key];
            }
            return data;
        },
        stack: function(options) {
            var stack =  loader({
                pattern: ['*'],
                replaceString: /(^(gulp|metalsmith)(-|\.)|-|\.)/g,
                camelize: false,
                rename: {},
            });
            if (options && options.key) {
                return stack[options.key];
            }
            return stack;
        },
    },
    handlers: {
        error: function(error) {
            gutil.log(gutil.colors.red(error.message));;
            gutil.beep();
            this.emit('end');
        },
    },
};

// Register tasks
require('require-dir')('./tasks');
