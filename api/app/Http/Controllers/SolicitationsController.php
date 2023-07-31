<?php

namespace App\Http\Controllers;

use App\Models\Solicitation;
use App\Models\SolicitationDetails;
use App\Repositories\SolicitationRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SolicitationsController extends Controller
{
	public function __construct(private SolicitationRepository $repository)
	{
	}
	
	public function data(Request $request, Solicitation $solicitation): JsonResponse
	{
		try {
			$this->getPermissions($request->user());
			return response()->json([
				'status' => 'ok',
				'message' => $this->repository->data($solicitation, $request->user())
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
			$solicitations = $this->repository->list($request->all(), $user);
			$total = $this->repository->total($request->all(), $user);
			$values = $this->getValues($total, $request->get('index'), $request->get('limit'));
			
			return response()->json([
				'status' => 'ok',
				'message' => $solicitations,
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
			$user = $request->user();
			return $this->repository->add($request->all(), $user);
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
			Solicitation::destroy($id);
			return response()->json([
				'status' => 'ok',
				'message' => 'Solicitação excluída com sucesso!',
			]);
		} catch (\Exception $e) {
			return response()->json([
				'status' => 'error',
				'message' => $e->getMessage()
			], 500);
		}
	}
	
	public function destroy_detail(Request $request, int $id): JsonResponse
	{
		try {
			$this->getPermissions($request->user());
			SolicitationDetails::destroy($id);
			return response()->json([
				'status' => 'ok',
				'message' => 'Detalhe da solicitação excluído com sucesso!',
			]);
		} catch (\Exception $e) {
			return response()->json([
				'status' => 'error',
				'message' => $e->getMessage()
			], 500);
		}
	}
	
	public function change(Request $request, string $type, int $id): JsonResponse
	{
		try {
			$user =$this->getPermissions($request->user());
			if ($user->category != 1) throw new \Exception('Não autorizado!');
			return response()->json([
				'status' => 'ok',
				'message' => $this->repository->change($type, $id)
			]);
		} catch (\Exception $e) {
			return response()->json([
				'status' => 'error',
				'message' => $e->getMessage()
			], 500);
		}
	}
}