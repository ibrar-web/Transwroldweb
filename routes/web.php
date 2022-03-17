<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Customer\SurveyController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('layouts.app');
});
Route::get('/register', function () {
    return view('auth.register');
});
Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
// Route::middleware('auth:web')->group(function () {
// Route::post('/findmydata',[SurveyController::class,'findmydata']);

// });
Route::post('/findmydata',[SurveyController::class,'findmydata']);
Route::get('/logout', function () {
    Auth::logout();
    return view('layouts.app');
});

Route::post('/findmydata',[SurveyController::class,'findmydata']);

