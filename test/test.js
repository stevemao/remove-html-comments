'use strict';
var assert = require('assert');
var fs = require('fs');
var join = require('path').join;
var removeHtmlComments = require('../');

it('should return removed comments and processed html', function() {
  var html = fs.readFileSync(join(__dirname, 'fixture.html'), 'utf8');
  var expectedHtml = fs.readFileSync(join(__dirname, 'expected.html'), 'utf8');

  var result = removeHtmlComments(html);
  assert.deepEqual(result, {
    data: expectedHtml,
    comments: [
      '<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->',
      '<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->',
      '<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->',
      '<!--[if gt IE 8]><!-->',
      '<!--<![endif]-->',
      '<!-- Place favicon.ico and apple-touch-icon.png in the root directory -->',
      '<!--[if lt IE 7]>\n      <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>\n    <![endif]-->',
      '<!-- Add your site or application content here -->',
      '<!-- Google Analytics: change UA-XXXXX-X to be your site\'s ID -->',
      '<!--[if lt IE 9]>\n    <script src="scripts/oldieshim.c6e1ede8.js"></script>\n    <![endif]-->'
    ]
  });
});
