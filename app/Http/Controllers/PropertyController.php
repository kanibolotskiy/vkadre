<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Property_typevacation;
use App\Property_typecredit;
use App\Property_typeproperty;
use App\Property_typelink;
use App\Property_martial;
use App\Property_gender;


class PropertyController extends Controller
{
    public function index(){
        $properties["typevacation"]=Property_typevacation::select('id as value','name as label')->orderBy('name','ASC')->get();
        $properties["typecredit"]=Property_typecredit::select('id as value','name as label')->orderBy('name','ASC')->get();
        $properties["typeproperty"]=Property_typeproperty::select('id as value','name as label')->orderBy('name','ASC')->get();
        $properties["typelink"]=Property_typelink::select('id as value','name as label')->orderBy('name','ASC')->get();
        $properties["martial"]=Property_martial::select('id as value','name as label')->orderBy('name','ASC')->get();
        $properties["gender"]=Property_gender::select('id as value','name as label')->orderBy('name','ASC')->get();
        return $properties;
    }
}