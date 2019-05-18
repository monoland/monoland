<?php

namespace App\Http\Controllers\Monoland;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

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
        return $request->user();
    }

    public function menus(Request $request)
    {
        return response()->json([
            ['type' => 'item', 'icon' => 'dashboard', 'text' => 'Beranda', 'to' => ['name' => 'dashboard']],
            // ['type' => 'divider', 'class' => 'my-2'],
            // ['type' => 'subheader', 'text' => 'Master'],
            // ['type' => 'item', 'icon' => 'group_work', 'text' => 'Sekolah', 'to' => ['name' => 'school']],
            // ['type' => 'item', 'icon' => 'supervisor_account', 'text' => 'Pegawai', 'to' => ['name' => 'employee']],
            // ['type' => 'item', 'icon' => 'stars', 'text' => 'Nilai PK', 'to' => ['name' => 'worth']],
            // ['type' => 'item', 'icon' => 'assessment', 'text' => 'Pangkat', 'to' => ['name' => 'grade']],
            // ['type' => 'item', 'icon' => 'event_seat', 'text' => 'Jabatan', 'to' => ['name' => 'position']],
            // ['type' => 'subheader', 'class' => 'mt-2', 'text' => 'Transaksi'],
            // ['type' => 'item', 'icon' => 'assignment_turned_in', 'text' => 'Usulan', 'to' => ['name' => 'proposal']],
            // ['type' => 'item', 'icon' => 'assignment', 'text' => 'Penilaian', 'to' => ['name' => 'valuation']],
            // ['type' => 'item', 'icon' => 'assignment_ind', 'text' => 'Penetapan', 'to' => ['name' => 'legitimation']],
            ['type' => 'subheader', 'class' => 'mt-2', 'text' => 'Management'],
            ['type' => 'item', 'icon' => 'settings_applications', 'text' => 'Pengguna', 'to' => ['name' => 'user']],
            ['type' => 'item', 'icon' => 'perm_contact_calendar', 'text' => 'Profile', 'to' => ['name' => 'profile']],
        ]);
    }
}
