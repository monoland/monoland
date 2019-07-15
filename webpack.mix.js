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
mix.stylus('resources/styles/frontend/main.styl', 'public/styles/frontend.css');

mix.js('resources/scripts/backend.js', 'public/scripts')
mix.stylus('resources/styles/backend/main.styl', 'public/styles/backend.css');

mix.js('resources/scripts/mobile.js', 'public/scripts')
mix.stylus('resources/styles/mobile/main.styl', 'public/styles/mobile.css');

mix.extract(['vue', 'vuetify']);