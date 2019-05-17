const mix = require('laravel-mix');

mix.webpackConfig({
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            '@scripts': __dirname + '/resources/scripts'
        }
    }
});

mix.js('resources/scripts/frontend.js', 'public/scripts')
mix.stylus('resources/styles/frontend/main.styl', 'public/styles');

mix.extract(['vue', 'vuetify']);