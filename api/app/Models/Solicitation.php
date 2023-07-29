<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Solicitation extends Model
{
    use HasFactory;
	
	protected $fillable = [
		'user_id',
		'value',
	];
	
	protected $hidden = [
		'updated_at'
	];
	
	public function details(): HasMany
	{
		return $this->hasMany(SolicitationDetails::class);
	}
}
