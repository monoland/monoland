<?php

namespace App\Models;

use Laravel\Passport\HasApiTokens;
use Illuminate\Support\Facades\Hash;
use App\Http\Resources\UserResource;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\DB;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Scope for filter
     */
    public function scopeFilterOn($query, $request)
    {
        $sortaz = $request->descending === 'true' ? 'desc' : 'asc';
        $sortby = $request->has('sortBy') ? $request->sortBy : null;
        $filter = $request->has('filter') ? $request->filter : null;

        $mixquery = $query;

        if ($filter) {
            $mixquery = $mixquery->where('name', 'like', "%{$filter}%");
        }

        if ($sortby) {
            $mixquery = $mixquery->orderBy($sortby, $sortaz);
        }

        return $mixquery;
    }

    /**
     * Store
     */
    public static function storeRecord($request)
    {
        DB::beginTransaction();

        try {
            $model = new static;
            $model->name = $request->name;
            $model->email = $request->email;
            $model->authorization = $request->authorization;
            $model->password = Hash::make('12345678');
            $model->save();

            DB::commit();

            

            return new UserResource($model);
        } catch (\Exception $e) {
            DB::rollBack();

            abort(500, $e->getMessage());
        }
    }
}
