<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Solicitation extends Model
{
    use HasFactory;
	
	const PENDENCY = 1;
	const CANCELED = 2;
	const RESOLVED = 3;
	
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
	
	public function user(): BelongsTo
	{
		return $this->belongsTo(User::class);
	}
}
