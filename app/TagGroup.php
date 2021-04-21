<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class TagGroup extends Model
{
    protected $fillable  = ['title', 'tags', 'visible', 'view'];

    public function save(array $options = [])
    {
        $this->attributes = $options;
        parent::save();
    }
}
