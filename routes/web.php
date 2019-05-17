<?php

Route::prefix('account')->middleware('guest')->group(function(){
    Route::post('login', 'Auth\LoginController@login');
});

Route::prefix('account')->middleware('auth')->group(function(){
    Route::post('logout', 'Auth\LoginController@logout');
});

Route::middleware('guest')->group(function() {
    Route::get('/', 'Monoland\AppsController@frontend')->name('login');
});

Route::prefix('backend')->middleware('auth')->group(function(){
    Route::get('/', 'Monoland\AppsController@backend');
});