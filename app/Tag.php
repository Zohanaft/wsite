<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    public function save(array $options = [])
    {
        if (empty($this->slug)) {
            $this->slug = str_slug($this->title);
            $this->weight = 1;
        }

        parent::save();
    }
}
