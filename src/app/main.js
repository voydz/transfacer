var settings = require ('./modules/Settings');

module.exports = function() {
    settings.set('port', 1337);
    console.log(settings.get('port'));
};
