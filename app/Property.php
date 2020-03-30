<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    protected $fillable = ['customer_id','typeproperty_id', 'property', 'summa','date','comment'];
}
