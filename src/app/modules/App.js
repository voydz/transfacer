var settings = require('./Settings');
var Theme = require('./Theme');
var Addon = require('./Addon');
var Profile = require('./Profile');

/**
 * main application
 *
 * @param window
 * @param jQuery
 * @constructor
 */
var App = function(window, jQuery)
{
    this.$window = window;
    this.$jquery = jQuery;

    this.boot();
};

/**
 * init application
 */
App.prototype.boot = function()
{
    // set theme
    this._bootTheme();

    // init filesystem driver
    this._bootService();

    // load app backbone
    this.$addons = new Addon(this.$service);

    this.$profiles = new Profile(this.$service);

    //console.log(this.$addons.all());
    //console.log(JSON.stringify(this.$addons.get('ElvUI')))

    this.$profiles.backup(function(err) {
        //if (err)
            //console.log(err);

        console.log("finished");
    });
}

/**
 * set app theme from config
 *
 * @private
 */
App.prototype._bootTheme = function()
{
    var theme = new Theme(this.$jquery);
    theme.load(settings.get('app.theme'));
}

/**
 * loads the apps backbone and operating service
 *
 * @private
 */
App.prototype._bootService = function()
{
    var Service = null;
    var config = settings.get('app.service');

    switch (config)
    {
        case 'dropbox':
            Service = require('./Dropbox');
            break;

        case 'file':
            Service = require('./File');
            break;

        default:
            throw 'Undefined service \''+ config +'\'';
            break;
    }

    this.$service = new Service();
}

module.exports = App;