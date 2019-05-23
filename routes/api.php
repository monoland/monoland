<?php

Route::middleware('throttle:200,1')->group(function () {
    Route::post('media', 'Monoland\MediaController@store');
    Route::delete('media/{media}', 'Monoland\MediaController@destroy');
    Route::get('media/{media}/download', 'Monoland\MediaController@download');
});

Route::middleware('auth:api')->group(function() {
    Route::get('/user', 'Monoland\AppsController@user');
    Route::get('/menus', 'Monoland\AppsController@menus');
    Route::put('/profile', 'Monoland\AppsController@profile');
    Route::put('/password', 'Monoland\AppsController@password');
    
    Route::post('users/bulks', 'Monoland\UserController@bulks');
    Route::resource('users', 'Monoland\UserController');
});
