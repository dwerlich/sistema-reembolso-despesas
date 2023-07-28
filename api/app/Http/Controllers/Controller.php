<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;
	
	protected function getPermissions(?User $user = null)
	{
		if (!$user) throw new \Exception('Token inválido!');
		if ($user->category != 1) throw new \Exception('Não autorizado!');
	}
	
	protected function getValues(int $total, int $index, int $limit): array
	{
		$totais['partial'] = min(($index + 1) * $limit, $total);
		$totais['start'] = $index === 0 ? $total === 0 ? 0 : 1 : $index * $limit + 1;
		
		return $totais;
	}
}
