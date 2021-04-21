<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use App\TagGroup;

class Collection extends Model
{   
    public function save(array $options = [])
    {   
        if (empty($this->slug)) {
            $this->slug = str_slug($this->title);
            $this->attributes['visible'] = "FADE";
            $this->attributes['view'] = "NOTE";
            $this->attributes['to_index_page'] = 0;
        }
        $model = TagGroup::where('title', $this->attributes['title'])->update([
            'visible' => $this->attributes['visible'],
            'title' => $this->attributes['title'],
            'view' => $this->attributes['view'],
            'to_index_page' => $this->attributes['to_index_page']
        ]);
        parent::save();
    }

    public function update(array $attributes = [], array $options = []) {
        $model = TagGroup::where('title', $this->title)->update($attributes, $options);
        parent::update();
    }

}
