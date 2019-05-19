<?php

Route::middleware('auth:api')->group(function() {
    Route::get('/user', 'Monoland\AppsController@user');
    Route::get('/menus', 'Monoland\AppsController@menus');
    
    Route::resource('users', 'Monoland\UserController');
    // Route::resource('school', 'Monoland\SchoolController');
});
