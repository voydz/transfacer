var file = require("file");
var Addon = require('./Addon');

/**
 * interface profile backup and restore engine
 *
 * @constructor
 */
var Profile = function() {
};

/**
 * shortcut to lists all addons
 * in the current profile
 *
 * @returns {*|{options}}
 */
Profile.prototype.addons = function() {
    //return addons.all();
}

/**
 * backs up the current profile
 */
Profile.prototype.backup = function() {

    // backup profile
}

/**
 * restores the given profile and
 * backs up the current one before
 *
 * @param profile
 */
Profile.prototype.restore = function(profile) {

    this.backup(); // save current profile

    // restore profile
}


module.exports = Profile;