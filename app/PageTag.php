<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class PageTag extends Model
{   
    public function save(array $options = [])
    {   
        parent::save();
    }
}
