<?php

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $model = new Setting();
        $model->id = 'company';
        $model->name = 'Monoland';
        $model->slogan = 'Build your apps with passion';
        $model->avatar = null;
        $model->height = '120px';
        $model->width = '120px';
        $model->save();
    }
}
