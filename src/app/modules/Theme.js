var path = require('path');

/**
 * theme engine
 *
 * @param jQuery
 * @constructor
 */
var Theme = function(jQuery) {
    this.$jquery = jQuery;
};

/**
 * loads a theme with the given name
 * on runtime
 *
 * @param name
 */
Theme.prototype.load = function(name) {
    var $ = this.$jquery;
    var link = $('link[data-theme]');

    var dir = link.data('theme-dir');
    var file = link.data('theme-file');

    $('link[data-theme]').attr('href', path.join(dir, name, file));
}

module.exports = Theme;