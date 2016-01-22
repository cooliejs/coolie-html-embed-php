/**
 * support html embed <?php?>
 * @author ydr.me
 * @create 2016-01-22 17:19
 */


'use strict';



'use strict';

var dato = require('ydr-utils').dato;

var pkg = require('./package.json');

var defaults = {
    attributeName: 'data-original',
    tagName: 'img',
    progress: 'pre-html'
};

module.exports = function (configs) {
    configs = dato.extend({}, defaults, configs);

    var cooliePreHTMLAttrResource = function (options) {
        if (options.progress !== configs.progress) {
            return options;
        }

        var coolie = this;

        options.code = coolie.matchHTML(options.code, {
            tag: configs.tagName
        }, function (node) {
            if (!node.attrs || !node.attrs[configs.attributeName]) {
                return node;
            }

            var url = node.attrs[configs.attributeName];
            var ret = coolie.buildResPath(url, options.file);
            node.attrs[configs.attributeName] = ret.url;
            return node;
        });

        return options;
    };

    cooliePreHTMLAttrResource.package = pkg;

    return cooliePreHTMLAttrResource;
};

module.exports.defaults = defaults;

