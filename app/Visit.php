<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Visit extends Model
{
    protected $fillable = ['customer_id', 'date', 'time_arrival', 'time_leaving', 'duration'];
}
