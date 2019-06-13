<?php

Route::middleware('throttle:200,1')->group(function () {
    Route::get('company', 'Monoland\AppsController@company');
});

Route::middleware('auth:api')->group(function() {
    // monoland
    Route::get('/user', 'Monoland\AppsController@user');
    Route::get('/menus', 'Monoland\AppsController@menus');
    Route::put('/profile', 'Monoland\AppsController@profile');
    Route::put('/password', 'Monoland\AppsController@password');
    
    Route::get('authent/combo', 'Monoland\AuthentController@combo');
    Route::post('users/bulks', 'Monoland\UserController@bulks');
    Route::resource('users', 'Monoland\UserController');
    Route::resource('setting', 'Monoland\SettingController');

    Route::post('media', 'Monoland\MediaController@store');
    Route::delete('media/{media}', 'Monoland\MediaController@destroy');
    Route::get('media/{media}/download', 'Monoland\MediaController@download');

    // application
});
