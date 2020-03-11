<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $table = 'customers';
    public function histories()
    {
        return $this->hasMany('App\History','customer_id','id');
    }
    public function properties()
    {
        return $this->hasMany('App\Property','customer_id','id');
    }
    public function kredits()
    {
        return $this->hasMany('App\Kredit','customer_id','id');
    }
}
