var path = require('path')
var config = require('conf.js')

module.exports = new config({
        userConfig: process.env.TRANSFACER_HOME,
        localConfig: process.env.TRANSFACER_LOCAL
    });