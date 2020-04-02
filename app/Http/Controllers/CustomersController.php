<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Customer;
use App\History;
use App\Property;
use App\Credit;
use App\Medical;
use App\Btrip;
use App\Hospital;
use App\Vacation;
use App\Promotion;
use App\Link;
use App\Visit;
use App\Polygraf;
use App\File;

use App\Property_typevacation;
use App\Property_typeproperty;
use App\Property_typecredit;
use App\Property_typelink;

use App\Property_martial;
use App\Property_gender;

use DB;

class CustomersController extends Controller
{
    static function sortUrl($output,$table=null){
        $out["selector"]=$table?$table.".id":"id";
        $out["order"]="ASC";
        if(isset($output["sort"])){
            $sort_arr=json_decode($output["sort"],TRUE);
            $out["selector"]=$sort_arr[0]["selector"];
            $out["order"]=$sort_arr[0]["order"];
        }
        return $out;
    }
   
    public function index()
    {

        return Customer::
        leftjoin('property_martials as pm', 'pm.id', '=', 'customers.martial_id')
        ->leftjoin('property_genders as pg', 'pg.id', '=', 'customers.gender_id')
        ->leftjoin('property_subdivisions as ps', 'ps.id', '=', 'customers.subdivision_id')
        ->leftjoin('property_custstatuses as pc', 'pc.id', '=', 'customers.custstatus_id')
        ->leftjoin('property_departments as pd', 'pd.id', '=', 'customers.department_id')
        ->select(
            'customers.*',
            'pm.name as martial','pg.name as gender','ps.name as subdivision','pc.name as custstatus','pd.name as department',

            DB::raw('CONCAT(customers.surname," ",customers.name," ",customers.patronymic) as fullname'))
        ->get();
    }
    //DATE_FORMAT(customers.dob,"%d.%m.%Y")
    //'IFNULL("",cusromers.dob) as dob',
    public function customers_select(Request $request){
        $searchParam=$request->searchParam;
        if($searchParam){
            return Customer::select('customers.id as value', DB::raw('CONCAT(customers.surname," ",customers.name," ",customers.patronymic) as label'))
            ->where('customers.name','like','%'.$searchParam.'%')
            ->orWhere('customers.surname','like','%'.$searchParam.'%')
            ->orWhere('customers.patronymic','like','%'.$searchParam.'%')
            ->limit(10)
            ->get();
        }
    }
    
    public function show(Customer $customer)
    {   
        //$returned_customer=$customer;
        //$returned_customer["dob"]=time();
        //$dob=$customer->dob;
        
        //$returned_customer["dob"]=($customer->dob)?date("d.m.Y",strtotime($customer->dob)." 00:00:00"):null;
        /*
        return Customer::select(
            'customers.id'
        );
        */
        return $customer;
    }
    
    public function update(Request $request, Customer $customer)
    {
        /**Семейный статус */
        $martial_item=$request->get('martial_name');
        if($martial_item){
            $item = new Property_martial;
            $item->name = $request->get('martial_name');
            $item->save();
            $martial_id=$item->id;
        }else{
            $martial_id=$request->get('martial_id');
        }

        /**Пол*/
        $gender_item=$request->get('gender_name');
        if($gender_item){
            $item = new Property_gender;
            $item->name = $request->get('gender_name');
            $item->save();
            $gender_id=$item->id;
        }else{
            $gender_id=$request->get('gender_id');
        }
        /*Текстовые*/
        $customer->name=$request->get('name');
        $customer->surname=$request->get('surname');
        $customer->patronymic=$request->get('patronymic');
            

        /*Списки*/
        $customer->martial_id=$martial_id;
        $customer->gender_id=$gender_id;
        
        $customer->save();
        return response()->json($request, 200);
    }
 
    public function delete(Customer $customer)
    {
        $customer->delete();
        return response()->json(null, 204);
    }
    

    /**Трудовая книжка */
    public function history($customer_id, $params=null){
        parse_str($params, $output);
        $sorting_rule=$this->sortUrl($output);

        $history = History::where('customer_id','=',$customer_id)
            ->orderBy($sorting_rule["selector"], $sorting_rule["order"])
            ->get();
        return $history;
    }

    public function history_store(Request $request, History $history=null)
    {
        if(!$history){
            History::create($request->all());
        }else{
            $history->update($request->all());
        }
        $out["success"]=true;
        return response()->json($out,201);
    }
    public function history_delete(History $history)
    {
        $history->delete();
        return response()->json(null, 204);
    }

    /**Имущество */
    public function property($customer_id, $params=null){
        parse_str($params, $output);
        $sorting_rule=$this->sortUrl($output,"properties");

        $property = Property::leftjoin('property_typeproperties as pt', 'pt.id', '=', 'properties.typeproperty_id')
        ->where('customer_id','=',$customer_id)
        ->select('properties.*','pt.name as typeproperty')
        ->orderBy($sorting_rule["selector"], $sorting_rule["order"])
        ->get();
        return $property;
    }
    public function property_store(Request $request, Property $property=null)
    {
        $new_property_item=$request->get('typeproperty_name');
        if($new_property_item){
            $item = new Property_typeproperty;
            $item->name = $request->get('typeproperty_name');
            $item->save();
            $typeproperty_id=$item->id;
            $out["new_item"]=$item;
            $out["new_item_dictionary"]="typeproperty";
        }else{
            $typeproperty_id=$request->get('typeproperty_id');
        }
        if(!$property){
            $property = new Property;
            $property->customer_id=$request->get('customer_id');
        }
        $property->typeproperty_id=$typeproperty_id;
        $property->property=$request->get('property');
        $property->summa=$request->get('summa')?preg_replace('/[^0-9]/', '', $request->get('summa')):null;
        $property->date=$request->get('date');
        $property->comment=$request->get('comment');
        $property->save();
        $out["success"]=true;
        return response()->json($out,200);
    }
    public function property_delete(Property $property)
    {
        $property->delete();
        return response()->json(null, 204);
    }

    /**Кредиты */
    public function credit($customer_id, $params=null){
        parse_str($params, $output);
        $sorting_rule=$this->sortUrl($output,"credits");

        $credit = Credit::leftjoin('property_typecredits as pt', 'pt.id', '=', 'credits.typecredit_id')
        ->where('customer_id','=',$customer_id)
        ->select('credits.*','pt.name as typecredit')
        ->orderBy($sorting_rule["selector"], $sorting_rule["order"])
        ->get();
        return $credit;
    }
    public function credit_store(Request $request, Credit $credit=null)
    {
        $new_property_item=$request->get('typecredit_name');
        if($new_property_item){
            $item = new Property_typecredit;
            $item->name = $request->get('typecredit_name');
            $item->save();
            $typecredit_id=$item->id;
            $out["new_item"]=$item;
            $out["new_item_dictionary"]="typecredit";
        }else{
            $typecredit_id=$request->get('typecredit_id');
        }
        if(!$credit){
            $credit = new Credit;
            $credit->customer_id=$request->get('customer_id');
        }
        
        $credit->typecredit_id=$typecredit_id;
        $credit->summa=preg_replace('/[^0-9]/', '', $request->get('summa'));
        $credit->srok=$request->get('srok');
        $credit->summa_month=preg_replace('/[^0-9]/', '', $request->get('summa_month'));
        $credit->date=$request->get('date');        
        $credit->save();
        $out["success"]=true;
        return response()->json($out,200);
    }
    public function credit_delete(Credit $credit)
    {
        $credit->delete();
        return response()->json(null, 204);
    }

    /**Медицинская карта */
    public function medical($customer_id, $params=null){
        parse_str($params, $output);
        $sorting_rule=$this->sortUrl($output);

        $medical = Medical::where('customer_id','=',$customer_id)
        ->orderBy($sorting_rule["selector"], $sorting_rule["order"])
        ->get();
        return $medical;
    }
    public function medical_store(Request $request,Medical $medical=null)
    {
        if(!$medical){
            Medical::create($request->all());
        }else{
            $medical->update($request->all());
        }
        $out["success"]=true;        
        return response()->json($out,201);
    }
    public function medical_delete(Medical $medical)
    {
        $medical->delete();
        return response()->json(null, 204);
    }


    /**Коммандировки */
    public function btrip($customer_id, $params=null){
        parse_str($params, $output);
        $sorting_rule=$this->sortUrl($output);

        $btrip = Btrip::where('customer_id','=',$customer_id)
        ->select('btrips.*',DB::raw('CONCAT(DATE_FORMAT(date_from,"%d.%m.%Y")," - ",DATE_FORMAT(date_to,"%d.%m.%Y")) as date')) 
        ->orderBy($sorting_rule["selector"], $sorting_rule["order"])
        ->get();
        return $btrip;
        //DB::raw('CONCAT(first_name," ",last_name) as full_name')
    }
    public function btrip_store(Request $request,Btrip $btrip=null)
    {
        if(!$btrip){
            Btrip::create($request->all());
        }else{
            $btrip->update($request->all());
        }
        $out["success"]=true;
        //Btrip::create($request->all());
        return response()->json($out,201);
    }
    public function btrip_delete(Btrip $btrip)
    {
        $btrip->delete();
        return response()->json(null, 204);
    }

    /**Больничные */
    public function hospital($customer_id, $params=null){
        parse_str($params, $output);
        $sorting_rule=$this->sortUrl($output);

        $hospital = Hospital::where('customer_id','=',$customer_id)
        ->select('hospitals.*',DB::raw('CONCAT(DATE_FORMAT(date_from,"%d.%m.%Y")," - ",DATE_FORMAT(date_to,"%d.%m.%Y")) as date')) 
        ->orderBy($sorting_rule["selector"], $sorting_rule["order"])
        ->get();
        return $hospital;
    }
    public function hospital_store(Request $request, Hospital $hospital=null)
    {
        if(!$hospital){
            Hospital::create($request->all());
        }else{
            $hospital->update($request->all());
        }
        $out["success"]=true;
        
        return response()->json($out,201);
    }
    public function hospital_delete(Hospital $hospital)
    {
        $hospital->delete();
        return response()->json(null, 204);
    }

    /**Отпуск */
    public function vacation($customer_id, $params=null){
        parse_str($params, $output);
        $sorting_rule=$this->sortUrl($output,"vacations");

        $vacation = Vacation::leftjoin('property_typevacations as tv', 'tv.id', '=', 'vacations.typevacation_id')
        ->where('customer_id','=',$customer_id)
        ->select('vacations.*',DB::raw('CONCAT(DATE_FORMAT(date_from,"%d.%m.%Y")," - ",DATE_FORMAT(date_to,"%d.%m.%Y")) as date'),'tv.name as typevacation') 
        ->orderBy($sorting_rule["selector"], $sorting_rule["order"])
        ->get();
        return $vacation;
    }

    public function vacation_store(Request $request,Vacation $vacation=null)
    {
        $new_property_item=$request->get('typevacation_name');
        if($new_property_item){
            $item = new Property_typevacation;
            $item->name = $request->get('typevacation_name');
            $item->save();
            $typevacation_id=$item->id;
            $out["new_item"]=$item;
            $out["new_item_dictionary"]="typevacation";
        }else{
            $typevacation_id=$request->get('typevacation_id');
        }

        if(!$vacation){
            $vacation = new Vacation;
            $vacation->customer_id=$request->get('customer_id');
        }
        
        $vacation->date_from=$request->get('date_from');
        $vacation->date_to=$request->get('date_to');
        $vacation->base=$request->get('base');
        $vacation->typevacation_id=$typevacation_id;
        $vacation->save();

        $out["success"]=true;
        return response()->json($out,200);
    }
    public function vacation_delete(Vacation $vacation)
    {
        $vacation->delete();
        return response()->json(null, 204);
    }

    /**Поощрения */
    public function promotion($customer_id, $params=null){
        parse_str($params, $output);
        $sorting_rule=$this->sortUrl($output);

        $promotion = Promotion::where('customer_id','=',$customer_id)
        ->orderBy($sorting_rule["selector"], $sorting_rule["order"])
        ->get();
        return $promotion;
    }
    public function promotion_store(Request $request,Promotion $promotion=null)
    {
        if(!$promotion){
            Promotion::create($request->all());
        }else{
            $promotion->update($request->all());
        }
        $out["success"]=true;

        
        return response()->json($out,201);
    }
    public function promotion_delete(Promotion $promotion)
    {
        $promotion->delete();
        return response()->json(null, 204);
    }

    /**Связи */
    public function link($customer_id, $params=null){
        parse_str($params, $output);
        $sorting_rule=$this->sortUrl($output);

        $link = Link::where('customer_id','=',$customer_id)
        ->leftjoin('property_typelinks as tl', 'tl.id', '=', 'links.typelink_id')
        ->select('links.*','tl.name as typelink') 
        ->orderBy($sorting_rule["selector"], $sorting_rule["order"])
        ->get();
        return $link;
    }
    public function link_store(Request $request, Link $link=null)
    {
        $new_property_item=$request->get('typelink_name');
        if($new_property_item){
            $item = new Property_typelink;
            $item->name = $request->get('typelink_name');
            $item->save();
            $typelink_id=$item->id;
            $out["new_item"]=$item;
            $out["new_item_dictionary"]="typelink";
        }else{
            $typelink_id=$request->get('typelink_id');
        }

        if(!$link){
            $link = new Link;
            $link->customer_id=$request->get('customer_id');
        }
        
        $link->date=$request->get('date');
        $link->comment=$request->get('comment');
        //$link->base=$request->get('base');
        $link->typelink_id=$typelink_id;
        $link->save();

        $out["success"]=true;        
        return response()->json($out,201);
    }
    public function link_delete(Link $link)
    {
        $link->delete();
        return response()->json(null, 204);
    }

    /**Посещения */
    public function visit($customer_id, $params=null){
        parse_str($params, $output);
        $sorting_rule=$this->sortUrl($output);

        $visit = Visit::where('customer_id','=',$customer_id)
        ->orderBy($sorting_rule["selector"], $sorting_rule["order"])
        ->get();
        return $visit;
    }

    /**Полиграф */
    public function polygraf($customer_id, $params=null){
        parse_str($params, $output);
        $sorting_rule=$this->sortUrl($output);

        $polygraf = Polygraf::where('customer_id','=',$customer_id)
        ->leftjoin('customers as c', 'c.id', '=', 'polygrafs.tester_id')
        ->select('polygrafs.*',DB::raw('CONCAT(c.surname," ",c.name," ",c.patronymic) as tester')) 
        ->orderBy($sorting_rule["selector"], $sorting_rule["order"])
        ->get();
        $returned=[];
        foreach($polygraf as $item){
            $files=File::where('polygraf_id','=',$item->id)->get();
            $file_arr=[];
            foreach($files as $file){
                $file_arr[]=$file->file_name;
            }
            $files_str="";
            if($file_arr){
                $files_str=implode(", ",$file_arr);
            }
            $item["files"]=$files_str;
            
            $item["files_list"]=File::where('polygraf_id','=',$item->id)->get();
            $returned[]=$item;
        }
        return $returned;
    }
    public function polygraf_store(Request $request, Polygraf $polygraf=null)
    {
        if(!$polygraf){
            $polygraf = new Polygraf;
            $polygraf->customer_id=$request->get('customer_id');
        }
        
        $polygraf->date=$request->get('date');
        $polygraf->base=$request->get('base');

        $polygraf->tester_id=$request->get('tester_id');
        $polygraf->save();

        $out["success"]=true;        
        return response()->json($out,201);
    }
    public function polygraf_delete(Polygraf $polygraf)
    {
        $polygraf->delete();
        return response()->json(null, 204);
    }

}

