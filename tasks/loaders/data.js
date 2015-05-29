'use strict';
var fs = require('fs');
var yaml = require('js-yaml');


module.exports = {
    'site': yaml.load(fs.readFileSync('data/site.yml')),
};
