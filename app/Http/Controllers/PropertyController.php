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

use DB;

class PropertyController extends Controller
{
    public function fileUpload(Request $request)
    {
        print_r($_POST);
        $name = $request->file('file')->getClientOriginalName();
        echo "!".$name."!";
        //echo "!".$request->file."!";
        //print_r($request->file('file'));
        $image           = $request->data;
        /*
        echo "!".$image."!";
        $imagename       = time() . $image->getClientOriginalName();
        $destinationPath = public_path('/images');
        $uploadValue     = $image->move($destinationPath, $imagename);
        if ($uploadValue) {
            return response()->json($imagename);
        }
        */
    }

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

    /**Словари */
    private function property_models($property){
        switch ($property){
            case 'martial':
                return [new Property_martial,'martials'];

            case 'gender':
                return [new Property_gender,'genders'];

            case 'status':
                return [new Property_status,'statuses'];

            case 'education':
                return [new Property_education,'educations'];

            case 'criminal':
                return [new Property_criminal,'criminals'];

            case 'subdivision':
                return [new Property_subdivision,'subdivisions'];

            case 'department':
                return [new Property_department,'departments'];

            case 'custstatus':
                return [new Property_custstatus,'custstatuses'];

            case 'typevacation':
                return [new Property_typevacation,'typevacations'];

            case 'typeproperty':
                return [new Property_typeproperty,'typeproperties'];

            case 'typecredit':
                return [new Property_typecredit,'typecredits'];
             
            case 'typelink':
                return [new Property_typelink,'typelinks'];
        }
    }    
    public function property_index($property){
        return $this->property_models($property)[0]::select('id as value','name as label')->orderBy('name','ASC')->get();
    }
    public function property_update(Request $request,$property){
        
        $model=$this->property_models($property);
        $data = json_decode($request->getContent(),TRUE);
        foreach($data as $item){
            if($item["label"]){
                if($item["value"]){
                    DB::update('update property_'.$model[1].' set name = "'.$item["label"].'" where id = ?',[$item["value"]]);  
                }else{
                    DB::insert('insert into property_'.$model[1].' (name) values (?)',[addslashes($item["label"])]);  
                }
            }
        }
        return $model[0]::select('id as value','name as label')->orderBy('name','ASC')->get();
    }
    public function property_delete($property,$property_id){
        //echo $property;
        $model=$this->property_models($property);
        switch ($property){
            case "typeproperty":
                DB::update('update properties set typeproperty_id = null where typeproperty_id = ?',[$property_id]);
            break;
            case "typecredit":
                DB::update('update credits set typecredit_id = null where typecredit_id = ?',[$property_id]);
            break;
            case "typevacation":
                DB::update('update vacations set typevacation_id = null where typevacation_id = ?',[$property_id]);
            break;
            case "typelink":
                DB::update('update links set typelink_id = null where typelink_id = ?',[$property_id]);
            break;

            default:
                DB::update('update customers set '.$property.'_id = null where '.$property.'_id = ?',[$property_id]);
            
        }
       
        DB::update('delete from property_'.$model[1].' where id = ?',[$property_id]);
        return $model[0]::select('id as value','name as label')->orderBy('name','ASC')->get();
    }

    /*
    public function property_delete(Property_martial $martial){
        DB::update('update customers set martial_id = null where martial_id = ?',[$martial->id]);
        $martial->delete();
        return response()->json(null, 204);
    }

    /*
    public function martial_delete(Property_martial $martial){
        DB::update('update customers set martial_id = null where martial_id = ?',[$martial->id]);
        $martial->delete();
        return response()->json(null, 204);
    }
    
    public function gender_index(){
        return Property_gender::select('id as value','name as label')->orderBy('name','ASC')->get();
    }
    public function gender_delete(Property_gender $gender){
        DB::update('update customers set gender_id = null where gender_id = ?',[$gender->id]);
        $gender->delete();
        return response()->json(null, 204);
    }
    public function gender_update(Request $request){
        $data = json_decode($request->getContent(),TRUE);

        foreach($data as $item){
            if($item["label"]){
                if($item["value"]){
                    DB::update('update property_genders set name = "'.$item["label"].'" where id = ?',[$item["value"]]);  
                }else{
                    DB::insert('insert into property_genders (name) values (?)',[addslashes($item["label"])]);  
                }
            }
        }
        return Property_gender::select('id as value','name as label')->orderBy('name','ASC')->get();
    }
    */
}