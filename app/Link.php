<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Link extends Model
{
    protected $fillable = ['customer_id','linked_customer_id','linked_customer','typelink_id','date', 'comment'];
}
