<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Page extends JsonResource
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
      'cid' => $this->cid,
      'title' => $this->title,
      'body' => $this->body,
      'meta_description' => $this->meta_description,
      'created_at' => $this->created_at->format('d-m-Y'),
      'updated_at' => $this->updated_at->format('d-m-Y'),
    ];
  }

}
