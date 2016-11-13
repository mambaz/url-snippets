'use strict';

var async = require('async'),
    request = require('request'),
    _ = require('lodash'),
    service = require('./service.js');

/**
 * Expose `snippets`.
 */

module.exports = snippets;

/**
 * [snippets Get the page title, description, meta tags, images given by URL]
 * @param  {[string]} url     [description]
 * @param  optional => {[array]} options [html,isValidUrl,title,p,img]
 * @return {[object]}         [description]
 */
function snippets (url, options, callback) {

    options = service.dataMapping(options);

    var response = {};

    async.auto ({
            isValidUrl: function (cb) {
                cb(null, service.isValidUrl(url));
            },
            html: ['isValidUrl', function (cb, results) {

                request (url, function (err, res, body) {
                    cb (err, service.trimText(body));
                });

            }],
            title: ['isValidUrl', 'html', function (cb, results) {
                cb (null, service.getPageTitle(results.html));
            }],
            meta: ['isValidUrl', 'html', function (cb, results) {
                cb (null, service.getPageDesc(results.html));
            }],
            p: ['isValidUrl', 'html', function (cb, results) {
                cb(null, service.getPageParagraph(results.html));
            }],
            img: ['isValidUrl', 'html', function (cb, results) {
                cb (null, service.getPageImageSource(results.html));
            }],
        },

        function (err, results) {

            response.url = url;

            if (options.isValid || _.isEmpty(options)) {
                response.isValidUrl = results.isValidUrl;
            }

            if (options.title || _.isEmpty(options)) {
                response.title = results.title;
            }

            if (options.meta || _.isEmpty(options)) {
                response.meta = results.meta;
            }

            if (options.img || _.isEmpty(options)) {
                response.img = results.img;
            }

            if (options.p || _.isEmpty(options)) {
                response.p = results.p;
            }

            if (options.html) {
                response.html = results.html;
            }

            callback(err, response);
        }

    );
}
