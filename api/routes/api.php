<?php

use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\SolicitationsController;
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

Route::prefix('/categorias')->group(function () {
	Route::controller(CategoriesController::class)->group(function () {
		Route::get('/listar', 'list');
		Route::get('/dados/{category}', 'data');
		Route::post('/cadastrar', 'store');
		Route::delete('/excluir/{id}', 'destroy');
		Route::get('/novo-status/{id}', 'change');
	});
});

Route::prefix('/solicitacao')->group(function () {
	Route::controller(SolicitationsController::class)->group(function () {
		Route::get('/listar', 'list');
		Route::get('/dados/{solicitation}', 'data');
		Route::post('/cadastrar', 'store');
		Route::delete('/excluir/{id}', 'destroy');
		Route::get('/novo-status/{id}', 'change');
	});
});