<?php

namespace App\Models\Pages;

use Illuminate\Database\Eloquent\Model;

class Pages extends Model
{
    /**
     * required for qb (BaseController)
     */
    protected $fillable = [
        'id',
        'cid',
        'author_id',
        'body',
        'created_at',
        'excerpt',
        'image',
        'meta_description',
        'slug',
        'title',
        'updated_at',
        'status',
        'year',
        'type',
        'tags'
    ];
    /**
     * required for qb (BaseController)
     */
    public $dbFieldTypes = [
        'id' => 'int|ai',
        'cid' => 'int|nullable',
        'author_id' => 'int',
        'body' => 'text|nullable',
        'created_at' => 'timestamp',
        'excerpt' => 'string',
        'image' => 'string',
        'meta_description' => 'string',
        'slug' => 'string',
        'title' => 'string',
        'updated_at' => 'timestamp',
        'status' => 'enum',
        'year' => 'int',
        'type'=>'text',
        'tags'=>'text'
    ];

    public $tabName = 'pages';
    /**
     * required for qb (BaseController)
     */
    public function getFieldset() {
        return $this->fillable;
    }
}
