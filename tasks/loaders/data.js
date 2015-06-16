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
};
