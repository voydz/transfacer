var path = require('path');
var settings = require ('./modules/Settings');

module.exports = function(window, $) {

    // simple test
    setTheme($, settings.get('app.theme'));
};

function setTheme($, name)
{
    var base = '../node_modules/bootswatch';
    var file = 'bootstrap.min.css';

    $('link[data-theme]').attr('href', path.join(base, name, file));
}


