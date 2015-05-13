var path = require('path');
var wowtoc = require('wow-toc');
var settings = require('./Settings');

/**
 * addon handling class
 *
 * @param filesystem
 * @param basepath
 * @constructor
 */
var Addon = function(filesystem, basepath) {
    this.$filesystem = filesystem;

    this.setPath(basepath || settings.get('warcraft.path'))
};

/**
 * changes the current warcraft path
 * to the given one
 *
 * @param basepath
 */
Addon.prototype.setPath = function(basepath)
{
    this.$warcraftPath = basepath;
    this.$interfacePath = path.join(this.$warcraftPath, 'Interface');
    this.$addonPath = path.join(this.$interfacePath, 'AddOns');
}

/**
 * lists all currently installed addons
 * @returns {*}
 */
Addon.prototype.all = function() {

    return this.$filesystem
        .list(this.$addonPath);
}

/**
 * gets TOC information to the specified addon
 *
 * @param addon
 * @returns {{Name, Version}}
 */
Addon.prototype.get = function (addon) {
    var content = this._readToc(addon);
    var data = this._parseToc(content);

    return data;
}

/**
 * reads addons tocfile
 *
 * @param addon
 * @returns {*}
 * @private
 */
Addon.prototype._readToc = function(addon) {
    var tocfile = path.join(this.$addonPath, addon, addon + '.toc');

    var content = this.$filesystem
        .read(tocfile);

    return content;
}

/**
 * parses addons tocfile using wow-toc
 * module
 *
 * @param toc
 * @returns {object}
 * @private
 */
Addon.prototype._parseToc = function (toc) {
    return wowtoc.parse(toc);
}

module.exports = Addon;