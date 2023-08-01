<?php

namespace App\Helpers;

class Validator
{
	public static function requireValidator($fields, $data)
	{
		foreach ($fields as $key => $value) {
			if (!array_key_exists($key, $data) ||(is_string($data[$key]) && trim($data[$key]) === '')|| $data[$key] === null) {
				throw new \Exception('O campo ' . $value. ' é obrigatório!');
			}
		}
	}
}