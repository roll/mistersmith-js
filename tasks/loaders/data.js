'use strict';
var fs = require('fs');
var path = require('path');
var glob = require('glob');
var yaml = require('js-yaml');


module.exports = function(options) {
    var data = {};
    var files = glob.sync('data/**/*.*');
    files.forEach(function(file) {
        var rpath = path.relative('data', file);
        var parts = rpath.split(path.sep);
        var scope = data;
        parts.forEach(function(part, index) {
            if (index < parts.length - 1) {
                scope[part] = scope.part || {};
                scope = scope[part];
            } else {
                var key = path.basename(part, '.yml');
                scope[key] = yaml.load(fs.readFileSync(file));
            }
        });
    });
    // TODO: implement data overriding instead of basedir hack
    var gutil = require('gulp-util');
    if (gutil.env.basedir) {
        data.site.basedir = gutil.env.basedir;
    }
    if (options && options.key) {
        return data[options.key];
    }
    return data;
};
