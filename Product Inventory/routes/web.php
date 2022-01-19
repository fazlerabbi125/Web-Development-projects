<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AccountController;
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
])->middleware('auth');

Auth::routes();

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [AccountController::class, 'index'])->name('dashboard');
    Route::get('/profile/{id}/update',[AccountController::class, 'edit'])->name('account-edit');
    Route::put('/profile/{id}/update', [AccountController::class, 'update'])->name('account-update');
    Route::get('/dashboard/profile/{id}/delete',function(){
        return view('auth.account_deletion');
    })->name('confirm-account-deletion');
    Route::delete('/dashboard/profile/{id}/delete', [AccountController::class, 'delete'])->name('account-delete');
});

Route::get('/dashboard/account-deleted',function(){
    return view('auth.account_deletion');
})->middleware('guest');

Route::get('/about',function(){
    return view('about');
})->name('about');
