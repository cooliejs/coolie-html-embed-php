/**
 * support html embed <?php?>
 * @author ydr.me
 * @create 2016-01-22 17:19
 */


'use strict';

var dato = require('ydr-utils').dato;
var random = require('ydr-utils').random;

var pkg = require('./package.json');

var defaults = {
    regexps: [
        /<\?php[\s\S]*?\?>/gi,
        /<\?=[\s\S]*?\?>/g
    ]
};

/**
 * 生成一个随机的字符串占位符
 * @returns {string}
 */
var genKey = function () {
    return '≤' + random.string(10) + random.guid() + '≥';
};

module.exports = function (configs) {
    configs = dato.extend({}, defaults, configs);

    var sourceMap = Object.create(null);
    var coolieHTMLEmbedPHP = function (options) {
        switch (options.progress){
            case 'pre-html':
                dato.each(configs.regexps, function (index, regexp) {
                    options.code = options.code.replace(regexp, function (source) {
                        var key = genKey();
                        sourceMap[key] = source;
                        return key;
                    });
                });
                break;

            case 'post-html':
                dato.each(sourceMap, function (key, source) {
                    options.code = options.code.replace(key, source);
                });
                break;
        }

        return options;
    };

    coolieHTMLEmbedPHP.package = pkg;

    return coolieHTMLEmbedPHP;
};

module.exports.defaults = defaults;

