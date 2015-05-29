'use strict';
var fs = require('fs');
var yaml = require('js-yaml');


module.exports = yaml.load(fs.readFileSync('config.yml'));
