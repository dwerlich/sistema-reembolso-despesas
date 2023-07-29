<?php

namespace App\Http\Controllers;

use App\Repositories\SolicitationRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SolicitationsController extends Controller
{
	public function __construct(private SolicitationRepository $repository)
	{
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
				'start' => $values['start'],
			], 200);
		} catch (\Exception $e) {
			return response()->json([
				'status' => 'error',
				'message' => $e->getMessage(),
			], 500);
		}
	}
}