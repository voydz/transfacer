var fs = require("fs-extra");
var path = require('path');
var Addon = require('./Addon');

/**
 * interface profile backup and restore engine
 *
 * @constructor
 */
var Profile = function(filesystem)
{
    this.$filesystem = filesystem;
    this.$addons = new Addon(filesystem);

    // set paths
    this.$warcraftPath = this.$filesystem.$warcraftPath;
    this.$interfacePath = path.join(this.$warcraftPath, 'Interface');
    this.$addonPath = path.join(this.$interfacePath, 'AddOns');

    // select current interface
    this.switch('current');
};

/**
 * shortcut to addons handler
 * for the selected profile
 *
 * @returns {*}
 */
Profile.prototype.addons = function()
{
    return this.$addons;
}

/**
 * returns true whenever the
 * current profile is selected
 *
 * @returns {boolean}
 */
Profile.prototype.isCurrent = function()
{
    return 'current' == this.$profile.name;
}

/**
 * switches profiles
 * 'current' will switch to current warcraft
 * installation
 *
 * @param name
 */
Profile.prototype.switch = function(name)
{
    // directory setup
    var basePath = this.$filesystem.storagePath(name);
    var interfacePath = path.join(basePath, 'Interface');
    var addonPath = path.join(interfacePath, 'AddOns');

    this.$profile = {
        name: name,
        basePath: basePath,
        interfacePath: interfacePath,
        addonPath: addonPath
    };

    // set addons module to basepath
    this.$addons.setPath(this.$profile.basePath)
}

/**
 * installs the current selected profile
 * except 'current'
 *
 * @param backup
 */
Profile.prototype.install = function(backup, callback)
{
    if (this.isCurrent())
        throw "current profile is already installed";

    if (backup === true)
        this.backup();

    if (typeof backup === 'function')
        callback = backup;

    this.$filesystem.copy(
        this.$profile.interfacePath,
        this.$interfacePath,
        callback);
}

/**
 * backs up the current profile
 */
Profile.prototype.backup = function(callback)
{
    this.$filesystem.copy(
        this.$interfacePath,
        this.$profile.interfacePath,
        callback);
}

/**
 * restores the saved version of the current
 * profile and backs up the current one before
 *
 * @param profile
 */
Profile.prototype.restore = function(callback)
{
    if ( ! this.isCurrent())
        throw "you have to switch to current profile first";

    this.$filesystem.copy(
        this.$profile.interfacePath,
        this.$interfacePath,
        callback);
}


module.exports = Profile;