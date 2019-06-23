<?php

namespace App\Http\Controllers\Monoland;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Hash;
use App\Http\Resources\SettingResource;
use App\Models\Setting;

class AppsController extends Controller
{
    public function frontend()
    {
        return view('default', ['pagemode' => 'frontend']);
    }

    public function backend()
    {
        return view('default', ['pagemode' => 'backend']);
    }

    public function user(Request $request)
    {
        return new UserResource($request->user());
    }

    public function profile(Request $request) 
    {    
        return User::updateRecord($request, $request->user());
    }

    public function password(Request $request)
    {
        $this->validate($request, [
            'old_password' => 'required|old_password',
            'password' => 'confirmed|max:8|different:old_password'
        ]);

        return User::updatePassword($request, $request->user());
    }

    public function company(Request $request)
    {
        return new SettingResource( Setting::find('company') );
    }

    public function menus(Request $request)
    {
        return response()->json([
            ['type' => 'item', 'icon' => 'dashboard', 'text' => 'Beranda', 'to' => ['name' => 'dashboard']],
            ['type' => 'subheader', 'text' => 'Masters', 'class' => 'mt-2'],
            ['type' => 'item', 'icon' => 'people', 'text' => 'Pengguna', 'to' => ['name' => 'user']],
            ['type' => 'item', 'icon' => 'whatshot', 'text' => 'OAuth Apps', 'to' => ['name' => 'client']],
        ]);
    }
}
