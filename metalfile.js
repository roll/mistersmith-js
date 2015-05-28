var metalsmith = require('metalsmith');
var branch = require('metalsmith-branch');
var collections = require('metalsmith-collections');
var excerpts = require('metalsmith-excerpts');
var markdown = require('metalsmith-markdown');
var permalinks = require('metalsmith-permalinks');
var templates = require('metalsmith-templates');
var moment = require('moment');


// Build sources
metalsmith(__dirname)
  .metadata({
    site: {
      title: 'My Site',
    }
  })
  .source('./sources')
  .destination('./build')
  .use(markdown())
  .use(excerpts())
  .use(templates({
      engine: 'swig',
      autoescape: false,
      directory: 'views',
      moment: moment
  }))
  .build(function (err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log('Site build complete!');
    }
  });
