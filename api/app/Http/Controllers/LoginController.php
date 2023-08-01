<?php

namespace App\Http\Controllers;

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
			$user = User::where('email', $request->email)->first();
			if (!$user || ! Hash::check($request->password, $user->password)) {
				throw new Exception('Usuário ou senha inválidos!');
			}
			
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