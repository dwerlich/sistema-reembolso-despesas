<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LoginController
{
	public function authentication(Request $request): JsonResponse
	{
		try {
			$credentials = $request->only(['email', 'password']);
			
			if (!$token = auth()->attempt($credentials)) {
				throw new Exception('Usuário ou senha inválidos!');
			}
			
			return response()->json([
				'status' => 'ok',
				'message' => $token]);
		} catch (Exception $e) {
			return response()->json([
				'status' => 'error',
				'message' => $e->getMessage()
			], 500);
		}
	}
	
	public function logged(Request $request): JsonResponse
	{
		$user = $request->user();
		if (!$user) throw new Exception('Token inválido!');
		try {
			return response()->json([
				'status' => 'ok',
				'message' => $user]);
		} catch (Exception $e) {
			return response()->json([
				'status' => 'error',
				'message' => $e->getMessage()
			], 500);
		}
	}
}