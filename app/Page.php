<?php

namespace App;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Request;
use TCG\Voyager\Facades\Voyager;
use TCG\Voyager\Traits\Translatable;
use App\TagGroup;

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

    $ids_new_tags = Request::input('page_belongstomany_tag_relationship',[]);
    $ids_new_collection = Request::input('page_belongstomany_collection_relationship', []);

    $this->updateTags($ids_new_tags);
    $this->updateGroups($ids_new_collection);

    $map = (array) DB::select("SELECT DISTINCT page_groups.collection_id, page_tag.tag_id FROM page_groups RIGHT JOIN page_tag ON page_tag.page_id = page_groups.page_id ORDER BY page_groups.collection_id");
    $cmap = [];
    $nmap = [];

    foreach ($map as $el) {
      $cmap[] = serialize([
        'collection_id' => $el->collection_id,
        'tag_id' => $el->tag_id
      ]);
    }

    foreach ($ids_new_collection as $collection) {
      foreach ($ids_new_tags as $tag) {
        array_push($nmap, serialize([
          'collection_id' => (int) $collection, 
          'tag_id' => (int) $tag
        ]));
      }
    }

    $s = array_unique(array_merge_recursive($nmap, $cmap));

    $result_map = [];

    foreach ($s as $el) {
      $result_map[] = unserialize($el);
    }

    $res = [];
    foreach ($result_map as $el) {
      $res[$el['collection_id']][] = $el['tag_id'];
    }

    foreach ($res as $key=>$value) {
      $buf = DB::select('SELECT * FROM collections WHERE id = ?', [$key]);
      
      $title = $buf[0]->title;
      $visible = $buf[0]->visible;
      $view = $buf[0]->view;
      $index_page = $buf[0]->to_index_page;

      $tags = [];
      
      foreach ($value as $tag) {
        $buffer = DB::select('SELECT title FROM tags WHERE id = ?', [$tag]);
        array_push($tags, $buffer[0]->title);
      }

      $res_tags = implode(',', $tags);

      $model = TagGroup::where('title', $title)->update([
        'title' => $title,
        'tags' => $res_tags,
        'visible' => $visible,
        'view' => $view,
        'to_index_page' => $index_page
      ]);
      if (!$model) {
        $model = new TagGroup();
        $model->save([
          'title' => $title,
          'tags' => $res_tags,
          'visible' => $visible,
          'view' => $view,
          'to_index_page' => $index_page
        ]);
      }

    }

    parent::save();
  }

  /**
   * GROUPS
   * 
   * 
   * 
   */
  public function updateGroups($ids_new) {
    $query = "SELECT * FROM page_groups WHERE page_id = ?";

    $models = DB::select($query, [$this->id]);
    
    $ids_old = [];
    foreach ($models as $model) {
      $ids_old[] = $model->collection_id;
    }

    $ids = array_unique(array_merge($ids_old, $ids_new));
    $s = implode(',',$ids);
    
    if ($s) {
      // tags
      $query = "SELECT collection_id, count(*) as count_groups FROM page_groups WHERE collection_id in ($s) GROUP BY collection_id ";
      $models = DB::select($query);

      $groupNames = [];
      foreach ($ids_new as $pageGroup) {
        $group = DB::select("SELECT title FROM collections WHERE id = ?", [$pageGroup]);
        array_push($groupNames, $group[0]->title);
      }

      $groups = implode(',', $groupNames);
      DB::update("UPDATE pages SET collections = ? WHERE id = ?", [$groups, $this->id]);
    }
  }

  /**
   * TAGS
   * 
   * 
   * 
   */
  public function updateTags($ids_new) {
    $query = "SELECT * FROM page_tag WHERE page_id = ?";

    $models = DB::select($query, [$this->id]);
    
    $ids_old = [];
    foreach ($models as $model) {
      $ids_old[] = $model->tag_id;
    }

    $ids = array_unique(array_merge($ids_old, $ids_new));
    $s = implode(',',$ids);

    if ($s) {
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

  public function groups()
  {
    return $this->belongsToMany('App\Collection', 'page_groups');
  }

  public function taggroups() {
    return $this->belongsToMany('App\TagGroup', 'tag_groups');
}

}
