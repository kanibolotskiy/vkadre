<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Property_gender;

class PropertyGenderController extends Controller
{
    public function index()
    {
        return Property_gender::all();
    }
}
