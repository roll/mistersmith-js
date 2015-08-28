'use strict';
var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var glob = require('glob');
var yaml = require('js-yaml');
var yargs = require('yargs');
var gutil = require('gulp-util');
var reqdir = require('require-dir');
var loader = require('gulp-load-plugins');


// Register meta
gulp.meta = {
    loaders: {
        config: function(options) {
            var config = yaml.load(fs.readFileSync('config.yml'));
            config = update_hash_from_cli('config', config);
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
            data = update_hash_from_cli('data', data);
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
            stack = update_hash_from_cli('stack', stack);
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
    plugins: reqdir('tasks/plugins'),
};

// Hash updater from cli
function update_hash_from_cli(option, hash) {
    var updates = yargs.argv[option] || [];
    if (typeof updates === 'string') {
        updates = [updates];
    }
    updates.forEach(function (value){
        var splited = value.split('=');
        var key = splited[0];
        var value = eval(splited[1]);
        update_hash_by_key_value(hash, key, value);
    });
    return hash;
}

//Hash updater by key, value
function update_hash_by_key_value(hash, key, value) {
    var parts = key.split('.');
    var scope = hash;
    parts.forEach(function(part, index) {
        if (index < parts.length - 1) {
            scope = scope[part] || {};
        } else {
            scope[part] = value;
        }
    });
    return hash;
}

// Register tasks
require('require-dir')('./tasks');
