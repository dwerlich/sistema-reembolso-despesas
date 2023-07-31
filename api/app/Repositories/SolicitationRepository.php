<?php

namespace App\Repositories;

use App\Helpers\Utils;
use App\Models\Solicitation;
use App\Models\SolicitationDetails;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use JetBrains\PhpStorm\ArrayShape;

class SolicitationRepository
{
	public function add($data, User $user): JsonResponse
	{
		try {
			DB::beginTransaction();
			$solicitation = new Solicitation();
			if ($data['id'] > 0) $solicitation = Solicitation::find($data['id']);
			$solicitation->status = Solicitation::PENDENCY;
			$solicitation->user_id = $user->id;
			$solicitation->value = (new Utils)->moneyToFloat($data['valueTotal']);
			$solicitation->save();
			
			foreach ($data['category'] as $index => $value) {
				$details = new SolicitationDetails();
				if ($data['idDetail'][$index] > 0) $details = SolicitationDetails::find($data['idDetail'][$index]);
				$details->category_id = $value;
				$details->solicitation_id = $solicitation->id;
				$details->value = (new Utils)->moneyToFloat($data['value'][$index]);
				$details->save();
			}
			
			DB::commit();
			return response()->json([
				'status' => 'ok',
				'message' => 'Solicitação cadastrada com sucesso!'
			], 201);
		} catch (\Exception $e) {
			DB::rollBack();
			return response()->json([
				'status' => 'error',
				'message' => $e->getMessage()
			], 500);
		}
	}
	
	#[ArrayShape(['id' => "mixed", 'valueTotal' => "string", 'details' => "array"])]
	public function data(Solicitation $solicitation, User $user): array
	{
		if ($user->id != $solicitation->user_id && $user->category > 1) throw new \Exception('Não autorizado!');
		$details = [];
		foreach ($solicitation->details as $detail) {
			$details[] = [
				'id' => $detail->id,
				'category' => $detail->category->id,
				'category_name' => $detail->category->name,
				'value' => 'R$ ' . number_format($detail->value, 2, ',', '.')
			];
		}
		return [
			'user_name' => $solicitation->user->name,
			'id' => $solicitation->id,
			'valueTotal' => 'R$ ' . number_format($solicitation->value, 2, ',', '.'),
			'details' => $details
		];
	}
	
	private function generateWhere($solicitations, array $filter, User $user)
	{
		if ($filter['user']) {
			$solicitations = $solicitations->where('user_id', $filter['user']);
		}
		if ($filter['status'] === '2,3') {
			$solicitations = $solicitations->where('status', '>', '1');
		} else {
			$solicitations = $solicitations->where('status', $filter['status']);
		}
		if ($filter['category']) {
			$solicitations = $solicitations->where('category_id', $filter['category']);
		}
		$start = \DateTime::createFromFormat('d/m/Y', $filter['start']);
		if ($start) {
			$solicitations = $solicitations->where('solicitations.created_at', '>', $start->format('Y-m-d 00:00'));
		}
		$end = \DateTime::createFromFormat('d/m/Y', $filter['end']);
		if ($end) {
			$solicitations = $solicitations->where('solicitations.created_at', '<', $end->format('Y-m-d 23:59'));
		}
		if ($user->category == 1 && $filter['user']) {
			$solicitations = $solicitations->where('user_id', $filter['user']);
		} elseif ($user->category > 1) {
			$solicitations = $solicitations->where('user_id', $user->id);
		}
		
		return $solicitations;
	}
	
	public function list(array $filter, User $user)
	{
		$solicitations = Solicitation::join('users', 'users.id', '=', 'solicitations.user_id')
			->selectRaw('solicitations.id , solicitations.value, DATE_FORMAT(solicitations.created_at,
						"%d/%m/%Y %H:%i:%s") as date, users.name as user_name, solicitations.user_id');
		$solicitations = $this->generateWhere($solicitations, $filter, $user);
		return $solicitations->offset($filter['index'])
			->orderBy('solicitations.created_at', 'desc')
			->limit($filter['limit'])
			->get();
	}
	
	public function total(array $filter, User $user)
	{
		$solicitations = Solicitation::query()->selectRaw('COUNT(id) as count');
		$solicitations = $this->generateWhere($solicitations, $filter, $user);
		return $solicitations->first()->count;
	}
	
	public function change(string $type, int $id): JsonResponse
	{
		try {
			$solicitation = Solicitation::find($id);
			if ($type == 'confirmar') {
				$solicitation->status = Solicitation::RESOLVED;
			} elseif ($type == 'cancelar') {
				$solicitation->status = Solicitation::CANCELED;
			}
			$solicitation->save();
			return response()->json([
				'status' => 'ok',
				'message' => 'Solicitação cadastrada com sucesso!'
			]);
		} catch (\Exception $e) {
			return response()->json([
				'status' => 'error',
				'message' => $e->getMessage()
			], 500);
		}
	}
}