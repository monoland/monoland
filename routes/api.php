<?php

Route::middleware('throttle:200,1')->group(function () {
    Route::post('media', 'Monoland\MediaController@store');
    Route::delete('media/{media}', 'Monoland\MediaController@destroy');
    Route::get('media/{media}/download', 'Monoland\MediaController@download');
});

Route::middleware('auth:api')->group(function() {
    Route::get('/user', 'Monoland\AppsController@user');
    Route::get('/menus', 'Monoland\AppsController@menus');
    
    Route::post('users/bulks', 'Monoland\UserController@bulks');
    Route::resource('users', 'Monoland\UserController');
    // Route::resource('school', 'Monoland\SchoolController');
});
