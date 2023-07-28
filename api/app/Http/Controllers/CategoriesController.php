<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Repositories\CategoryRespository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CategoriesController extends Controller
{
	public function __construct(private CategoryRespository $repository)
	{
	}
	
	public function data(Request $request, Category $category): JsonResponse
	{
		try {
			$this->getPermissions($request->user());
			return response()->json([
				'status' => 'ok',
				'message' => $category
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
			$categories = $this->repository->list($request->all());
			$total = $this->repository->total($request->all());
			$values = $this->getValues($total, $request->get('index'), $request->get('limit'));
			
			return response()->json([
				'status' => 'ok',
				'message' => $categories,
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
			return response()->json([
				'status' => 'ok',
				'message' => $this->repository->remove($id),
			]);
		} catch (\Exception $e) {
			return response()->json([
				'status' => 'error',
				'message' => $e->getMessage()
			], 500);
		}
	}
	
	public function change(Request $request, int $id): JsonResponse
	{
		try {
			$this->getPermissions($request->user());
			return response()->json([
				'status' => 'ok',
				'message' => $this->repository->change($id),
			]);
		} catch (\Exception $e) {
			return response()->json([
				'status' => 'error',
				'message' => $e->getMessage()
			], 500);
		}
	}
}