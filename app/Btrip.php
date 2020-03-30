<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Btrip extends Model
{
    protected $fillable = ['customer_id', 'date_from', 'date_to', 'place', 'goal', 'base'];
}
