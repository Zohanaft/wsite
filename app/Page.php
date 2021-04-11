<?php

namespace App;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Request;
use TCG\Voyager\Facades\Voyager;
use TCG\Voyager\Traits\Translatable;

class Page extends Model
{
  use Translatable;

  protected $translatable = ['title', 'slug', 'body'];

  protected $ids = [];
  protected $guarded = [];
  /**
   * Statuses.
   */
  const STATUS_ACTIVE = 'ACTIVE';
  const STATUS_INACTIVE = 'INACTIVE';

  /**
   * List of statuses.
   *
   * @var array
   */
  public static $statuses = [self::STATUS_ACTIVE, self::STATUS_INACTIVE];

  public function save(array $options = [])
  {
      // If no author has been assigned, assign the current user's id as the author of the post
    if (!$this->author_id && Auth::user()) {
      $this->author_id = Auth::user()->id;
    }

    $query = "SELECT * FROM page_tag WHERE page_id = ?";
    
    $models = DB::select($query, [$this->id]);
    
    $ids_old = [];
    foreach ($models as $model) {
      $ids_old[] = $model->tag_id;
    }

    parent::save();

    $ids_new = Request::input('page_belongstomany_tag_relationship',[]);

    $ids = array_unique(array_merge($ids_old, $ids_new));
    $s = implode(',',$ids);
    

    $query = "SELECT tag_id, count(*) as count_tags FROM page_tag WHERE tag_id in ($s) GROUP BY tag_id ";
    $models = DB::select($query);

    foreach ($models as $model) {
      $weight = $model->count_tags;
      $is_update = false;
      if (in_array($model->tag_id,$ids_new) && !in_array($model->tag_id,$ids_old)) {
        $weight++;
        $is_update = true;
      } elseif (!in_array($model->tag_id,$ids_new) && in_array($model->tag_id,$ids_old)) {
        $weight--;
        $is_update = true;
      }

      $query = "UPDATE tags SET weight = ? WHERE id = ? ";
      DB::update($query, [$weight, $model->tag_id]);
    }

    $tagNames = [];
    foreach ($ids_new as $pageTag) {
      $tag = DB::select("SELECT title FROM tags WHERE id = ?", [$pageTag]);
      array_push($tagNames,$tag[0]->title);
    }
    $tags = implode(',', $tagNames);
    DB::update("UPDATE pages SET tags = ? WHERE id = ?", [$tags, $this->id]);
  }

  /**
   * Scope a query to only include active pages.
   *
   * @param  $query  \Illuminate\Database\Eloquent\Builder
   *
   * @return \Illuminate\Database\Eloquent\Builder
   */
  public function scopeActive($query)
  {
    return $query->where('status', static::STATUS_ACTIVE);
  }

  public function tags()
  {   

    return $this->belongsToMany('App\Tag', 'page_tag');
  }
}
