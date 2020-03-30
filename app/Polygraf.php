<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Polygraf extends Model
{
    protected $fillable = ['customer_id', 'date', 'base', 'tester_id',];
}
