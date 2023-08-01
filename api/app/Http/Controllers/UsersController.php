<?php

namespace App\Http\Controllers;

use App\Helpers\Validator;
use App\Models\User;
use App\Repositories\UserRepository;
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
			$logged = $this->getPermissions($request->user());
			if ($logged->category != 1) throw new \Exception('Não autorizado!');
			return response()->json([
				'status' => 'ok',
				'message' => $this->repository->data($user),
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
			$user = $this->getPermissions($request->user());
			if ($user->category != 1) throw new \Exception('Não autorizado!');
			$users = $this->repository->list($request->all());
			$total = $this->repository->total($request->all());
			$values = $this->getValues($total, $request->get('index'), $request->get('limit'));
			
			return response()->json([
				'status' => 'ok',
				'message' => $users,
				'total' => $total,
				'partial' => $values['partial'],
				'start' => $values['start'],
			], 200);
		} catch (\Exception $e) {
			return response()->json([
				'status' => 'error',
				'message' => $e->getMessage(),
			], 500);
		}
	}
	
	public function store(Request $request): JsonResponse
	{
		try {
			$user = $this->getPermissions($request->user());
			if ($user->category != 1) throw new \Exception('Não autorizado!');
			$fields = [
				'name' => 'Nome',
				'email' => 'E-mail',
				'birthDate' => 'Data de Nascimento',
				'category' => 'Categoria',
			];
			if ($request->only('id')== 0) {
				$fields2 = [
					'password' => 'Senha',
				];
				$fields = array_merge($fields, $fields2);
			}
			Validator::requireValidator($fields, $request->all());
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
			$user = $this->getPermissions($request->user());
			if ($user->category != 1) throw new \Exception('Não autorizado!');
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