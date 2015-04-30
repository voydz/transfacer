var elixir = require('laravel-elixir');

/**
 * register additional watchs paths
 */
elixir.config.registerWatcher('default', [
    'src/**',
]);

elixir(function(mix) {

    var appDir = 'src/app';

    mix.browserify('app.js', appDir + '/bundle.js', './' + appDir);
});