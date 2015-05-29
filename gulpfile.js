'use strict';
var config = require('./tasks/loaders/config');
require('browser-sync').create(config.browsersync.name)
require('require-dir')('./tasks');
