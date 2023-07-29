<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SolicitationDetails extends Model
{
	use HasFactory;
	
	protected $fillable = [
		'category',
		'value',
	];
	
	protected $hidden = [
		'updated_at'
	];
	
	public function category(): BelongsTo
	{
		return $this->belongsTo(Category::class);
	}
}