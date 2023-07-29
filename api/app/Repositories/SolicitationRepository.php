<?php

namespace App\Repositories;

use App\Helpers\Utils;
use App\Models\Solicitation;
use App\Models\SolicitationDetails;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class SolicitationRepository
{
	public function add($data, User $user): JsonResponse
	{
		try {
			if ($data['id'] == 0) {
				DB::beginTransaction();
				$solicitation = new Solicitation();
				$solicitation->status = 1;
				$solicitation->user_id = $user->id;
				$solicitation->value = (new Utils)->moneyToFloat($data['valueTotal']);
				$solicitation->save();
				
				foreach ($data['category'] as $index => $value) {
					$details = new SolicitationDetails();
					$details->category_id = $value;
					$details->solicitation_id = $solicitation->id;
					$details->value = (new Utils)->moneyToFloat($data['value'][$index]);
					$details->save();
				}
				DB::commit();
			}
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
	
	public function data(User $user): array
	{
		return [
			'id' => $user->id,
			'name' => $user->name,
			'email' => $user->email,
			'category' => $user->category,
			'birthDate' => $user->birthDate,
		];
	}
	
	private function generateWhere($solicitations, array $filter)
	{
		if ($filter['user']) {
			$solicitations = $solicitations->where('user_id', $filter['user']);
		}
		if ($filter['category']) {
			$solicitations = $solicitations->where('category_id', $filter['category']);
		}
		$start = \DateTime::createFromFormat('d/m/Y', $filter['start']);
		if ($start) {
			$solicitations = $solicitations->where('created_at', '>', $start->format('Y-m-d 00:00'));
		}
		$end = \DateTime::createFromFormat('d/m/Y', $filter['end']);
		if ($end) {
			$solicitations = $solicitations->where('created_at', '<', $end->format('Y-m-d 23:59'));
		}
		
		return $solicitations;
	}
	
	public function list(array $filter)
	{
		$solicitations = Solicitation::join('users', 'users.id', '=', 'solicitations.user_id')
			->select('solicitations.id', 'solicitations.value', 'solicitations.created_at', 'users.name as user_name');
		$solicitations = $this->generateWhere($solicitations, $filter);
		return $solicitations->offset($filter['index'])
			->orderBy('name')
			->limit($filter['limit'])
			->get();
	}
	
	public function total(array $filter)
	{
		$solicitations = Solicitation::query()->selectRaw('COUNT(id) as count');
		$solicitations = $this->generateWhere($solicitations, $filter);
		return $solicitations->first()->count;
	}
}