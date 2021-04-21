<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;

class BaseController extends Controller
{

  private $query = '';

  private $queryStart = '';
  private $queryConditions = '';
  private $queryEnd = '';
  private $limit = '';
  private $offset = '';

  public function qb($model, $request) {
    $query = $request->query;
    $fieldset = $model->getFieldset();

    foreach ($query as $key => $val) {
      /**
       * sort __sort
       */
      if (preg_match('/__sort/', $key)) {
        $params = explode(',', $val);
        $this->queryStart = 'SELECT ';
        
        foreach ($params as $param) {
          $this->queryStart .= strval($param) . ',';
        }
        $this->queryStart = preg_replace('/,$/', '', $this->queryStart) . ' FROM ' . $model->tabName;
      }

      /**
       * param__gte=1&param__lte=3&param__ne=2
       * WHERE param > 2 
       * AND WHERE param < 3
       * AND WHERE param = 2
       */
      else if (preg_match('/__gte$/', $key)) {
        $param = preg_replace('/__gte$/', '', $key);
        if ($model->dbFieldTypes[$param] !== 'timestamp') {
          $this->queryConditions .= 'AND ' . $param . '>' . $val . '';
        }
      }

      else if (preg_match('/__lte$/', $key)) {
        $param = preg_replace('/__lte$/', '', $key);
        if ($model->dbFieldTypes[$param] !== 'timestamp') {
          $this->queryConditions .= 'AND ' . $param . '<' . $val . '';
        }
      }

      else if (preg_match('/__ne$/', $key)) {
        $param = preg_replace('/__ne$/', '', $key);
        $this->queryConditions .= 'AND ' . $param . '<>' . $val . '';
      }

      else if (preg_match('/__like$/', $key)) {
        $param = preg_replace('/__like$/', '', $key);
        $this->queryConditions .= 'AND ' . $param . ' LIKE ' . "'%" . $val . "%' ";
      }

      else if (preg_match('/__limit$/', $key)) {
        $this->limit .= ' LIMIT ' . $val . '';
      }

      else if(preg_match('/__offset$/', $key)) {
        $this->offset .= ' OFFSET ' . $val . '';
      }
      else if (in_array($key, $model->getFieldset())) {
        $this->queryConditions .= 'AND ' . $key . '=' . "'" . $val . "'";
      }
    }

    if ($this->queryConditions) {
      $this->queryConditions = preg_replace('/^AND/', ' WHERE', $this->queryConditions);
      $this->queryConditions = preg_replace('/AND/im', ' AND', $this->queryConditions);
    }
    
    if (!$this->queryStart) {
      $this->queryStart = 'SELECT * FROM ' . $model->tabName;
    }

    if ($this->offset) {
      if ($this->limit) {
        $this->queryEnd = $this->limit . $this->offset;
      }
      else {
        $this->queryEnd = ' LIMIT 10 ' . $this->offset;
      }
    }

    if (!$this->queryEnd) {
      $this->queryEnd = ' LIMIT 10 OFFSET 0';
    }

    $items = DB::select($this->queryStart . $this->queryConditions . $this->queryEnd);
    foreach ($items as $val) {
      if (isset($val->image)) {
        $val->image = asset('storage/' . $val->image);
      }
    }
    return $items;
  }

  public function sendResponse($result, $message)
  {

    $response = [
      'success' => true,
      'data'    => $result,
      'message' => $message,
    ];
    return response()->json($response, 200);
  }

  public function sendError($error, $errorMessages = [], $code = 404)
  {
    $response = [
      'success' => false,
      'message' => $error,
    ];

    if(!empty($errorMessages)){
      $response['data'] = $errorMessages;
    }
    
    return response()->json($response, $code);
  }

}
