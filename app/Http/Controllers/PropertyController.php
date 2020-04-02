<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Property_typevacation;
use App\Property_typecredit;
use App\Property_typeproperty;
use App\Property_typelink;
use App\Property_martial;
use App\Property_gender;

use App\Property_education;
use App\Property_status;
use App\Property_criminal;

use App\Property_subdivision;
use App\Property_custstatus;
use App\Property_department;


class PropertyController extends Controller
{
    public function index(){
        $properties["typevacation"]=Property_typevacation::select('id as value','name as label')->orderBy('name','ASC')->get();
        $properties["typecredit"]=Property_typecredit::select('id as value','name as label')->orderBy('name','ASC')->get();
        $properties["typeproperty"]=Property_typeproperty::select('id as value','name as label')->orderBy('name','ASC')->get();
        $properties["typelink"]=Property_typelink::select('id as value','name as label')->orderBy('name','ASC')->get();
        $properties["martial"]=Property_martial::select('id as value','name as label')->orderBy('name','ASC')->get();
        $properties["gender"]=Property_gender::select('id as value','name as label')->orderBy('name','ASC')->get();

        $properties["education"]=Property_education::select('id as value','name as label')->orderBy('name','ASC')->get();
        $properties["status"]=Property_status::select('id as value','name as label')->orderBy('name','ASC')->get();
        $properties["criminal"]=Property_criminal::select('id as value','name as label')->orderBy('name','ASC')->get();

        $properties["subdivision"]=Property_subdivision::select('id as value','name as label')->orderBy('name','ASC')->get();
        $properties["custstatus"]=Property_custstatus::select('id as value','name as label')->orderBy('name','ASC')->get();
        $properties["department"]=Property_department::select('id as value','name as label')->orderBy('name','ASC')->get();



        return $properties;
    }
}