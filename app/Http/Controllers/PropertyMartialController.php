<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Property_martial;

class PropertyMartialController extends Controller
{
    public function index()
    {
        return Property_martial::all();
    }
}
