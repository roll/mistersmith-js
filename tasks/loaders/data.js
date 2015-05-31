'use strict';
var fs = require('fs');
var yaml = require('js-yaml');


module.exports = function(options) {
    var data = {
        'site': yaml.load(fs.readFileSync('data/site.yml')),
        'stack': yaml.load(fs.readFileSync('data/stack.yml')),
    };
    if (options && options.key) {
        return data[options.key];
    }
    return data;
};
