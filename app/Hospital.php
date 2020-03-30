<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Hospital extends Model
{
    protected $fillable = ['customer_id', 'date_from', 'date_to', 'cause', 'base'];
}
