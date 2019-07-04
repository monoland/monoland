<?php

namespace App\Http\Controllers\Monoland;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Http\Resources\SettingResource;
use App\Models\Setting;
use Jenssegers\Agent\Agent;

class AppsController extends Controller
{
    protected $agent;

    public function __construct(Agent $agent)
    {
        $this->agent = $agent;
    }

    public function frontend()
    {
        if ($this->agent->isMobile()) {
            return view('default', ['pagemode' => 'mobifront']);
        } else {
            return view('default', ['pagemode' => 'frontend']);
        }
    }

    public function backend()
    {
        if ($this->agent->isMobile()) {
            return view('default', ['pagemode' => 'mobiback']);
        } else {
            return view('default', ['pagemode' => 'backend']);
        }
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
        return new SettingResource(Setting::find('company'));
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
