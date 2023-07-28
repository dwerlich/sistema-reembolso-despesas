<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('api')->get('/usuario', [LoginController::class, 'logged']);
Route::post('/login', [LoginController::class, 'authentication']);

Route::prefix('/usuarios')->group(function () {
	Route::controller(UsersController::class)->group(function () {
		Route::get('/listar', 'list');
		Route::get('/dados/{user}', 'data');
		Route::post('/cadastrar', 'store');
		Route::delete('/excluir/{id}', 'destroy');
	});
});