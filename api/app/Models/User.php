<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;
	
    protected $fillable = [
        'name',
        'email',
        'password',
	    'birthDate',
	    'category'
    ];
	
    protected $hidden = [
        'password',
        'remember_token',
	    'created_at',
	    'updated_at'
    ];
	
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
	
	public function getJWTIdentifier()
	{
		return $this->getKey();
	}
	
	public function getJWTCustomClaims(): array
	{
		return [];
	}
	
	public function getBirthDateAttribute($value)
	{
		$dateTime = \DateTime::createFromFormat('Y-m-d', $value);
		return $dateTime->format('d/m/Y');
	}
}
