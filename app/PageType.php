<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class PageType extends Model
{
    public function save(array $options = [])
    {
        if (empty($this->slug)) {
            $this-> = str_slug($this->title);
        }

        parent::save();
    }
}
