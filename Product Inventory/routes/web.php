<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\CategoryController;

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

Route::get('/', [ProductController::class, 'index'])->name('home');
Route::resource('product', ProductController::class)->except(['index'])->names([
    'show' => 'product.detail',
    'destroy'=> 'product.delete'
]);

Auth::routes();

Route::controller(AccountController::class)->group(function () {
    Route::get('/dashboard', 'index')->name('dashboard');
    Route::get('/profile/{id}/update','edit')->name('account-edit');
    Route::put('/profile/{id}/update', 'update')->name('account-update');
    Route::delete('/dashboard/profile/{id}/delete', 'delete')->name('account-delete');
    Route::get('/dashboard/profile/{id}/delete', 'delete')->name('confirm-account-deletion');
});

Route::get('/dashboard/account-deleted',function(){
    return view('auth.account_deletion');
})->middleware('guest');

Route::resource('category', CategoryController::class)->names([
    'destroy'=> 'category.delete'
]);


Route::get('/about',function(){
    return view('about');
})->name('about');
