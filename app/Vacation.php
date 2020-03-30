<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Vacation extends Model
{
    protected $fillable = ['customer_id', 'date_from', 'date_to', 'typevacation_id', 'base'];
}
