<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;

use App\Http\Controllers\Controller;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Http\Resources\Page as PageResource;
use App\Models\Pages\Pages as Page;
use App\TagGroup;

use Validator;

class PagesController extends BaseController
{

  public function index(Request $request)
  {
    $pages = $this->qb(new Page(), $request);

    return $this->sendResponse($pages, 'Pages Retrieved Successfully.');
  }

  public function show($id)
  {
    $page = Page::find($id);
    if (is_null($page)) {
        return $this->sendError('Product not found.');
    }

    return $this->sendResponse($page, 'Product Retrieved Successfully.');
  }

  public function groups() {
    $model = TagGroup::where('visible', '=','VISIBLE')->orderBy('to_index_page', 'desc')->get();
    return  $this->sendResponse($model, 'Products Retrieved Successfully.');
  }

}
