<?php

namespace App\Repositories;

use App\Models\Category;

class CategoryRespository
{
	public function add($data): string
	{
		$msg = 'cadastrada';
		if ($data['id'] == 0) {
			Category::create($data);
		} else {
			$category = Category::find($data['id']);
			$category->name = $data['name'];
			$category->save();
			$msg = 'editada';
		}
		return "Categoria {$msg} com sucesso!";
	}
	
	public function list(array $filter)
	{
		return Category::query()
			->select('id', 'name', 'active',)
			->where('removed', 0)
			->offset($filter['index'])
			->orderBy('name')
			->limit($filter['limit'])
			->get();
	}
	
	public function total(array $filter)
	{
		return Category::query()
			->where('removed', 0)
			->selectRaw('COUNT(id) as count')
			->first()->count;
	}
	
	public function remove(int $id): string
	{
		$category = Category::find($id);
		$category->removed = !$category->removed;
		$category->save();
		return "Categoria excluída com sucesso!";
	}
	
	public function change(int $id): string
	{
		$category = Category::find($id);
		$category->active = !$category->active;
		$category->save();
		return "Status alterado para {$category->getActiveStr()}!";
	}
}