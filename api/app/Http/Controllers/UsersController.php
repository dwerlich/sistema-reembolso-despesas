<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Repositories\UserRepository;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UsersController extends Controller
{
	public function __construct(private UserRepository $repository)
	{
	}
	
	public function data(Request $request, User $user): JsonResponse
	{
		try {
			$this->getPermissions($request->user());
			return response()->json([
				'status' => 'ok',
				'message' => $this->repository->data($user)
			]);
		} catch (\Exception $e) {
			return response()->json([
				'status' => 'error',
				'message' => $e->getMessage()
			], 500);
		}
	}
	
	public function list(Request $request): JsonResponse
	{
		try {
		$this->getPermissions($request->user());
		$users = $this->repository->list($request->all());
		$total = $this->repository->total($request->all());
		$values = $this->getValues($total, $request->get('index'), $request->get('limit'));
		
		return response()->json([
			'status' => 'ok',
			'message' => $users,
			'total' => $total,
			'partial' => $values['partial'],
			'start' => $values['start']
		], 201);
		} catch (\Exception $e) {
			return response()->json([
				'status' => 'error',
				'message' => $e->getMessage()
			], 500);
		}
	}
	
	public function store(Request $request): JsonResponse
	{
		try {
			$this->getPermissions($request->user());
			$msg = $this->repository->add($request->all());
			return response()->json([
				'status' => 'ok',
				'message' => $msg
			]);
		} catch (\Exception $e) {
			return response()->json([
				'status' => 'error',
				'message' => $e->getMessage()
			], 500);
		}
	}
	
	public function destroy(Request $request, int $id): JsonResponse
	{
		try {
			$this->getPermissions($request->user());
			User::destroy($id);
			return response()->json([
				'status' => 'ok',
				'message' => 'Usuário excluído com sucesso!',
			]);
		} catch (\Exception $e) {
			return response()->json([
				'status' => 'error',
				'message' => $e->getMessage()
			], 500);
		}
	}
}