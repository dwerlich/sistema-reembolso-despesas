<?php

namespace App\Repositories;

use App\Models\User;
use Carbon\Carbon;

class UserRepository
{
	public function add($data): string
	{
		$data['birthDate'] = Carbon::createFromFormat('d/m/Y', $data['birthDate']);
		$msg = 'cadastrado';
		if ($data['id'] == 0) {
			$data['password'] = password_hash($data['password'], PASSWORD_ARGON2I);
			User::create($data);
		} else {
			$user = User::find($data['id']);
			$user->name = $data['name'];
			$user->email = $data['email'];
			$user->category = $data['category'];
			$user->birthDate = $data['birthDate'];
			$user->save();
			$msg = 'editado';
		}
		return "Usuário {$msg} com sucesso!";
	}
	
	public function data(User $user): array
	{
		return [
			'id' => $user->id,
			'name' => $user->name,
			'email' => $user->email,
			'category' => $user->category,
			'birthDate' => $user->birthDate
		];
	}
	
	private function generateWhere($users, array $filter)
	{
		if ($filter['name']) {
			$name = $filter['name'];
			$users = $users->where('name', 'like', "%$name%");
		}
		if ($filter['email']) {
			$email = $filter['email'];
			$users = $users->where('email', 'like', "%$email%");
		}
		if ($filter['category']) {
			$users = $users->where('category', $filter['category']);
		}
		
		return $users;
	}
	
	public function list(array $filter)
	{
		$users = User::query()->select('id', 'name', 'email', 'category');
		$users = $this->generateWhere($users, $filter);
		return $users->offset($filter['index'])
			->orderBy('name')
			->limit($filter['limit'])
			->get();
	}
	
	public function total(array $filter)
	{
		$users = User::query()->selectRaw('COUNT(id) as count');
		$users = $this->generateWhere($users, $filter);
		return $users->first()->count;
	}
}