<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ClientResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'secret' => $this->secret,
            'redirect' => $this->redirect,
            'revoked' => $this->revoked,
            'lockicon' => $this->revoked ? '<i aria-hidden="true" class="v-icon material-icons theme--light">lock</i>' : '<i aria-hidden="true" class="v-icon material-icons theme--light">lock_open</i>',
            'updated_at' => (string) $this->updated_at
        ];
    }
}
