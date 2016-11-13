'use strict';

var chai = require('chai'),
    should = chai.should(),
    expect = chai.expect,
    fs = require('fs'),
    path = require('path'),
    service = require('../service.js'),
    testValidUrls = [
        'https://en.wikipedia.org/wiki/Earth'
    ],
    testInvalidUrls = [
        'string',
        'http://localhost/'
    ],
    testFiles = [
        'wiki-earth'
    ];

function getSrcFile (file) {
    return fs.readFileSync(path.join('test/fixtures', file + '.html'), 'utf8');
}

describe('##### URL SNIPPETS #####', function () {

    it('URL Valid URL', function () {
        testValidUrls.forEach( function(url) {
            var isValidURL = service.isValidUrl(url);
            expect(isValidURL).to.be.ok;
        });
    });

    it('URL Invalid URL', function () {
        testInvalidUrls.forEach( function(url) {
            var isValidURL = service.isValidUrl(url);
            expect(isValidURL).to.not.be.ok;
        });
    });

    it('Page Title', function () {
        testFiles.forEach( function(file) {
            var title = service.getPageTitle(getSrcFile(file));
            title.should.be.a('string');
        });
    });

    it('Page Description', function () {
        testFiles.forEach( function(file) {
            var meta = service.getPageDesc(getSrcFile(file));
            meta.should.be.a('object');
        });
    });

    it('Page Paragraph', function () {
        testFiles.forEach( function(file) {
            var p = service.getPageParagraph(getSrcFile(file));
            p.should.be.a('array');
        });
    });

    it('Page Images', function () {
        testFiles.forEach( function(file) {
            var img = service.getPageImageSource(getSrcFile(file));
            img.should.be.a('array');
        });
    });

});
