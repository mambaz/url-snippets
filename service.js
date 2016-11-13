'use strict';

var cheerio = require('cheerio'),
    _ = require('lodash'),
    urlRex = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/,
    quickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/; //check html tags

/**
 * Conver array to JSON object
 *
 *  @param {array}
 *  @return {object}
 */
exports.dataMapping = function (data) {
    var opt = {};

    if (data) {
        for (var prop in data) {
            if ('type' !== prop) {
                opt[data[prop]] = true;
            }
        }
    }

    return opt;
}

/**
 * Validate url
 *
 *  @param {url} string
 *  @return {boolean}
 */
exports.isValidUrl = function (url) {
    return urlRex.test(url);
}

/**
 * Trim string
 *
 *  @param {txt} string
 *  @return {string}
 */
function trimText (txt) {
    return txt.replace(/\r?\n|\r/g, '').replace(/\s+/g, ' ').trim();
}
exports.trimText = trimText;

/**
 * validate html tags
 *
 *  @param {html content} string
 *  @return {boolean}
 */
function checkHtml (txt) {
    return quickExpr.test(txt);
}

/**
 * Get title from html content
 *
 *  @param {body} html content
 *  @return {string}
 */
exports.getPageTitle = function (body) {

    if (checkHtml(body)) {

        var $ = cheerio.load(body);

        return trimText($('title').text());
    }

}

/**
 * Get meta from html content
 *
 *  @param {body} html content
 *  @return {object}
 */
exports.getPageDesc = function (body) {

    if (checkHtml(body)) {

        var $ = cheerio.load(body),
            meta = {};

        $("meta").each (function (i, tag) {

            if (!_.isEmpty($(this).attr('name')) &&
                !_.isEmpty($(this).attr('content'))) {

                meta[$(this).attr('name')] = $(this).attr('content');
            }
        });

        return meta;
    }

}

/**
 * Get paragaph from html content
 *
 *  @param {body} html content
 *  @return {array}
 */
exports.getPageParagraph = function (body) {

    if (checkHtml(body)) {

        var $ = cheerio.load(body),
            p = [];

        $("p").each (function () {

            var text = $(this).text().trim();

            if (!_.isEmpty(text)) {
                p.push(text);
            }

        });

        return p;
    }
}

/**
 * Get images from html content
 *
 *  @param {body} html content
 *  @return {array}
 */
exports.getPageImageSource = function (body) {

    if (checkHtml(body)) {

        var $ = cheerio.load(body),
            img = [];

        $("img").each (function () {

            var text = $(this).attr('src');

            if (!_.isEmpty(text)) {
                img.push(text);
            }

        });

        return img;
    }
}
