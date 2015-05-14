var fs = require("fs-extra");
var path = require('path');
var settings = require('./Settings');

/**
 * local storage filesystem driver
 *
 * @constructor
 */
var File = function()
{
    this.$storagePath = settings.get('services.file.path');
    this.$warcraftPath = settings.get('warcraft.path');
};

/**
 * returns storage path with specified extension
 *
 * @param ext
 * @returns {*|string}
 */
File.prototype.storagePath = function(ext)
{
    return path.join(this.$storagePath, ext)
}

/**
 * lists all directories in the
 * given path
 *
 * @param dir
 * @returns {*}
 */
File.prototype.list = function (path)
{
    return fs.readdirSync(path);
}

/**
 * creates a new directory
 *
 * @param path
 */
File.prototype.make = function (path)
{
    fs.mkdirSync(path);
}

/**
 * copies directory, even if it has subdirectories or files
 *
 * @param oldPath
 * @param newPath
 * @param callback
 */
File.prototype.copy = function (oldPath, newPath, callback)
{
    fs.copy(oldPath, newPath, callback);
}

/**
 * renames files or dirs
 *
 * @param oldPath
 * @param newPath
 */
File.prototype.rename = function (oldPath, newPath)
{
    fs.renameSync(oldPath, newPath);
}

/**
 * Removes a file or directory. The directory can have contents.
 *
 * @param path
 * @param callback
 */
File.prototype.remove = function (path, callback)
{
    fs.remove(path, callback);
}

/**
 * reads the file contents respecting
 * utf8 encoding
 *
 * @param file
 * @returns {*}
 */
File.prototype.read = function (file)
{
    return fs.readFileSync(file, {
        encoding: 'utf8',
        flag: 'r'
    });
}

File.prototype.write = function (file, data)
{
    fs.writeFileSync(file, data, {
        encoding: 'utf8'
    });
}

module.exports = File;