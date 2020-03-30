<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Medical extends Model
{
    protected $fillable = ['customer_id','date', 'memo'];
}
