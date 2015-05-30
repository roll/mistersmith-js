'use strict';
var fs = require('fs');
var yaml = require('js-yaml');


module.exports = function () {
    return yaml.load(fs.readFileSync('config.yml'));
}
