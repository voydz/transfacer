var fs = require("fs");
var settings = require('./Settings');

/**
 * local storage filesystem driver
 *
 * @constructor
 */
var File = function() {
    this.$storagePath = settings.get('app.services.file.path');
};

/**
 * lists all directories in the
 * given path
 *
 * @param dir
 * @returns {*}
 */
File.prototype.list = function (path) {
    return fs.readdirSync(path);
}

/**
 * reads the file contents respecting
 * utf8 encoding
 *
 * @param file
 * @returns {*}
 */
File.prototype.read = function (file) {
    return fs.readFileSync(file, {
        encoding: 'utf8',
        flag: 'r'
    });
}

module.exports = File;