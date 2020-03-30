<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Credit extends Model
{
    protected $fillable = ['customer_id','typecredit_id', 'summa', 'srok','summa_month','date'];
}
