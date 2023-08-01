<?php

namespace App\Http\Controllers;

use App\Helpers\Validator;
use App\Models\User;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class LoginController
{
	public function authentication(Request $request): JsonResponse
	{
		try {
			$fields = [
				'email' => 'E-mail',
				'password' => 'Senha',
			];
			Validator::requireValidator($fields, $request->only('email', 'password'));
			
			$user = User::where('email', $request->email)->first();
			if (!$user || ! Hash::check($request->password, $user->password)) {
				throw new Exception('Usuário ou senha inválidos!');
			}
			
			$user->tokens()->delete();
			$token = $user->createToken('login_token')->plainTextToken;

			return response()->json([
				'status' => 'ok',
				'message' => $user,
				'token' => $token]);
		} catch (Exception $e) {
			return response()->json([
				'status' => 'error',
				'message' => $e->getMessage()
			], 500);
		}
	}
}