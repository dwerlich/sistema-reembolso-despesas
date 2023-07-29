<?php

namespace App\Helpers;

class Utils
{
	public function moneyToFloat(string $string): float
	{
		$string = str_replace('R$ ', '', $string);
		$string = str_replace('.', '', $string);
		$string = str_replace(',', '.', $string);
		
		return (float)$string;
	}
}