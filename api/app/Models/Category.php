<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
	
	protected $fillable = [
		'name',
	];
	
	
	protected $hidden = [
		'removed',
		'created_at',
		'updated_at'
	];
	
	protected static function boot()
	{
		parent::boot();
		
		static::creating(function ($model) {
			$model->removed = false;
			$model->active = true;
		});
	}
	
	public function getActiveStr()
	{
		return $this->active ? 'Ativo' : 'Inativo';
	}
}
