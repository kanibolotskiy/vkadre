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

use App\Property_education;
use App\Property_typevacation;
use App\Property_typeproperty;
use App\Property_typecredit;
use App\Property_typelink;
use App\Property_status;
use App\Property_criminal;

use App\Property_martial;
use App\Property_gender;

use App\Property_subdivision;
use App\Property_custstatus;
use App\Property_department;

use DB;

class CustomersController extends Controller
{
    static function sortUrl($output,$table=null){
        $out["selector"]=$table?$table.".id":"id";
        $out["order"]="ASC";
        //echo $out["selector"]."|".
        
        if(isset($output["sort"])){
            $sort_arr=json_decode($output["sort"],TRUE);
            //print_r($sort_arr);
            if(isset($sort_arr[0]["columnName"])){
                $out["selector"]=$sort_arr[0]["columnName"];
                $out["order"]=$sort_arr[0]["direction"];
            }
        }
        return $out;
    }
   
    public function index($filter,$params=null)
    {
        parse_str($params, $output);
        $sorting_rule=$this->sortUrl($output,"properties");
        
        $take=$output["take"];
        $page=$output["page"];

        parse_str($filter, $output_filter);
        //print_r($output_filter["filter"]);
        //$filter_arr=json_decode($output_filter["filter"],TRUE);
        //print_r($filter_arr);
        //echo "*".$filter_arr["searchName"]."*";
        //$searchByName=trim($output_filter["searchName"]);
        //echo "*".html_entity_decode(preg_replace("/U\+([0-9A-F]{4})/", "&#x\\1;", $searchByName), ENT_NOQUOTES, 'UTF-8')."*";
        //$searchByName=$filter_arr["searchName"];
        //print_r($output_filter);
        //echo "!".html_entity_decode  ($searchByName)."!";
        //$searchByName='';

        //print_r($output_filter);
        $searchName=$output_filter["searchName"];

        $query = Customer::
        leftjoin('property_martials as pm', 'pm.id', '=', 'customers.martial_id')
        ->leftjoin('property_genders as pg', 'pg.id', '=', 'customers.gender_id')
        ->leftjoin('property_subdivisions as ps', 'ps.id', '=', 'customers.subdivision_id')
        ->leftjoin('property_custstatuses as pc', 'pc.id', '=', 'customers.custstatus_id')
        ->leftjoin('property_departments as pd', 'pd.id', '=', 'customers.department_id')
        ->leftjoin('property_educations as pe', 'pe.id', '=', 'customers.education_id')
        ->leftjoin('property_statuses as pst', 'pst.id', '=', 'customers.status_id')
        ->leftjoin('property_criminals as pcr', 'pcr.id', '=', 'customers.criminal_id')
        ->leftjoin('customers as cur', 'cur.id', '=', 'customers.curator_id')
        ->select(
            'customers.*',
            'pm.name as martial',
            'pg.name as gender',
            'ps.name as subdivision',
            'pc.name as custstatus',
            'pd.name as department',
            'pe.name as education',
            'pst.name as status',
            'pcr.name as criminal',
            //'cur.name as curator',
            DB::raw('CONCAT(IF(customers.surname IS NULL,"",customers.surname)," ",IF(customers.name IS NULL,"",customers.name)," ",IF(customers.patronymic IS NULL,"",customers.patronymic)) as fullname,
            CONCAT(IF(cur.surname IS NULL,"",cur.surname)," ",IF(cur.name IS NULL,"",cur.name)," ",IF(cur.patronymic IS NULL,"",cur.patronymic)) as curator
            '))
        ->orderBy($sorting_rule["selector"], $sorting_rule["order"]);
        
        if($searchName){
            $query->where(DB::raw('CONCAT(IF(customers.surname IS NULL,"",customers.surname)," ",IF(customers.name IS NULL,"",customers.name)," ",IF(customers.patronymic IS NULL,"",customers.patronymic))'), 'LIKE', "%".$searchName."%");
            
            //$query->where('customers.surname','like','%'.urldecode ($searchByName).'%');
        }

        return $query->paginate($take, ['*'], 'page', $page+1);
    }

    //DATE_FORMAT(customers.dob,"%d.%m.%Y")
    //'IFNULL("",cusromers.dob) as dob',
    public function customers_select(Request $request){
        $searchParam=$request->searchParam;
        if($searchParam){
            return Customer::select('customers.id as value', 
            DB::raw('CONCAT(IF(customers.surname IS NULL,"",customers.surname)," ",IF(customers.name IS NULL,"",customers.name)," ",IF(customers.patronymic IS NULL,"",customers.patronymic)) as label'))
            //->whereRaw('CONCAT(IF(customers.surname IS NULL,"",customers.surname)," ",IF(customers.name IS NULL,"",customers.name)," ",IF(customers.patronymic IS NULL,"",customers.patronymic))', ['%'.$searchParam.'%'])
            //->where('customers.patronymic','like','%'.$searchParam.'%')
            //->whereRaw('CONCAT(IF(customers.surname IS NULL,"",customers.surname)," ",IF(customers.name IS NULL,"",customers.name)," ",IF(customers.patronymic IS NULL,"",customers.patronymic))', '%иван%')
            ->where(DB::raw('CONCAT(IF(customers.surname IS NULL,"",customers.surname)," ",IF(customers.name IS NULL,"",customers.name)," ",IF(customers.patronymic IS NULL,"",customers.patronymic))'), 'LIKE', "%".$searchParam."%")

            //->orWhere('customers.patronymic','like','%'.$searchParam.'%')
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
    
    public function update(Request $request, Customer $customer=null)
    {
        $properties=[];

        if(!$customer){
            $customer=new Customer;
        }

        $file=$request->file('file');//->getClientOriginalName();
        if($file){
            $filename           = $file->getClientOriginalName();
            $destinationFolder  = '/uploads/photo/'.$customer->id."/";
            $destinationPath    = public_path($destinationFolder);

            $uploadValue        = $file->move($destinationPath, $filename);
            $customer->photo    = $destinationFolder.$filename;
            //echo $destinationFolder.$filename;
            //DB::insert('insert into files (polygraf_id,file_path,file_name) values (?,?,?)',[$polygraf->id,$destinationPath,$filename]);  
        }

        /**Семейный статус */
        $martial_item=$request->get('martial_name');
        if($martial_item){
            $item = new Property_martial;
            $item->name = $request->get('martial_name');
            $item->save();
            $martial_id=$item->id;
            $properties["martial"]=Property_martial::select('id as value','name as label')->orderBy('name','ASC')->get();
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
            $properties["gender"]=Property_gender::select('id as value','name as label')->orderBy('name','ASC')->get();
        }else{
            $gender_id=$request->get('gender_id');
        }

        /**Образование*/
        $education_item=$request->get('education_name');
        if($education_item){
            $item = new Property_education;
            $item->name = $request->get('education_name');
            $item->save();
            $education_id=$item->id;
            $properties["education"]=Property_education::select('id as value','name as label')->orderBy('name','ASC')->get();
        }else{
            $education_id=$request->get('education_id');
        }

        /**Статус*/
        $status_item=$request->get('status_name');
        if($status_item){
            $item = new Property_status;
            $item->name = $request->get('status_name');
            $item->save();
            $status_id=$item->id;
            $properties["status"]=Property_status::select('id as value','name as label')->orderBy('name','ASC')->get();
        }else{
            $status_id=$request->get('status_id');
        }

        /**Судимость*/
        $criminal_item=$request->get('criminal_name');
        if($criminal_item){
            $item = new Property_criminal;
            $item->name = $request->get('criminal_name');
            $item->save();
            $criminal_id=$item->id;
            $properties["criminal"]=Property_criminal::select('id as value','name as label')->orderBy('name','ASC')->get();
        }else{
            $criminal_id=$request->get('criminal_id');
        }

        /***
use App\Property_subdivision;
use App\Property_custstatus;
use App\Property_department;
 */
        /**Подразделение*/
        $subdivision_item=$request->get('subdivision_name');
        if($subdivision_item){
            $item = new Property_subdivision;
            $item->name = $request->get('subdivision_name');
            $item->save();
            $subdivision_id=$item->id;
            $properties["subdivision"]=Property_subdivision::select('id as value','name as label')->orderBy('name','ASC')->get();
        }else{
            $subdivision_id=$request->get('subdivision_id');
        }

        /**Статус сотрудника*/
        $custstatus_item=$request->get('custstatus_name');
        if($custstatus_item){
            $item = new Property_custstatus;
            $item->name = $request->get('custstatus_name');
            $item->save();
            $custstatus_id=$item->id;
            $properties["custstatus"]=Property_custstatus::select('id as value','name as label')->orderBy('name','ASC')->get();
        }else{
            $custstatus_id=$request->get('custstatus_id');
        }
        
        /**Отдел*/
        $department_item=$request->get('department_name');
        if($department_item){
            $item = new Property_department;
            $item->name = $request->get('department_name');
            $item->save();
            $department_id=$item->id;
            $properties["department"]=Property_department::select('id as value','name as label')->orderBy('name','ASC')->get();
        }else{
            $department_id=$request->get('department_id');
        }


        /*Текстовые*/
        $customer->name=$request->get('name');
        $customer->surname=$request->get('surname');
        $customer->patronymic=$request->get('patronymic');
        $customer->phone=$request->get('phone');
        $customer->mobphone=$request->get('mobphone');

        $customer->address_reg=$request->get('address_reg');
        $customer->address_res=$request->get('address_res');
        $customer->index_address_reg=$request->get('index_address_reg');
        $customer->index_address_res=$request->get('index_address_res');

        $customer->passport_number=$request->get('passport_number');
        $customer->passport_issuedby=$request->get('passport_issuedby');
        $customer->bpl=$request->get('bpl');
        $customer->inn=$request->get('inn');
        $customer->insurance_number=$request->get('insurance_number');
        $customer->medical_number=$request->get('medical_number');
        $customer->education_cap=$request->get('education_cap');
        $customer->education_speciality=$request->get('education_speciality');
        $customer->military_number=$request->get('military_number');
        $customer->military_place=$request->get('military_place');
        $customer->criminal_desc=$request->get('criminal_desc');
        $customer->characteristic=$request->get('characteristic');
        $customer->position=$request->get('position');
        $customer->vacation_base=$request->get('vacation_base');
        $customer->vacation_add=$request->get('vacation_add');
        
        
        /**Цены */

        $customer->salary=($request->get('salary')? preg_replace('/[^0-9.]/', '', $request->get('salary')):0);
        $customer->salary_add=($request->get('salary_add')? preg_replace('/[^0-9.]/', '', $request->get('salary_add')):0);
        $customer->salary_summ=($request->get('salary_summ')? preg_replace('/[^0-9.]/', '', $request->get('salary_summ')):0);

        $customer->prize_perc=($request->get('prize_perc')? preg_replace('/[^0-9.]/', '', $request->get('prize_perc')):0);
        $customer->prize=($request->get('prize')? preg_replace('/[^0-9.]/', '', $request->get('prize')):0);
        


        /*Даты */
        $customer->dob=$request->get('dob');
        $customer->passport_date=$request->get('passport_date');
        $customer->empl_date=$request->get('empl_date');
        $customer->unempl_date=$request->get('unempl_date');

        $customer->exp1=$request->get('exp1');
        $customer->exp2=$request->get('exp2');
        $customer->exp3=$request->get('exp3');
        

        /*Списки*/
        $customer->martial_id=$martial_id;
        $customer->gender_id=$gender_id;
        $customer->education_id=$education_id;
        $customer->status_id=$status_id;
        $customer->criminal_id=$criminal_id;

        $customer->subdivision_id=$subdivision_id;
        $customer->custstatus_id=$custstatus_id;
        $customer->department_id=$department_id;

        $customer->curator_id=$request->get('curator_id');
        
        //echo "!".$request->get('curator_id')."!";
        
        $customer->save();

        $out["success"]=true;
        

        $out["dictionaries"]=$properties;

        return response()->json($out, 200);
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
        //print_r($request->all());
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
        ->select('polygrafs.*',
        DB::raw('CONCAT(IF(c.surname IS NULL,"",c.surname)," ",IF(c.name IS NULL,"",c.name)," ",IF(c.patronymic IS NULL,"",c.patronymic)) as tester'))

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
        //print_r($request);
        //print_r($_POST);
        //echo "!".$request->date."!";

        if(!$polygraf){
            $polygraf = new Polygraf;
            $polygraf->customer_id=$request->get('customer_id');
        }
        
        //$file=$polygraf->file;
        

        $polygraf->date=$request->get('date');
        $polygraf->base=$request->get('base');
        
        $polygraf->tester_id=$request->get('tester_id');
        $polygraf->save();
        $file=$request->file('file');//->getClientOriginalName();
        if($file){
            $filename       = $file->getClientOriginalName();
            $destinationPath = public_path('/uploads/files/'.time()."/");
            $uploadValue     = $file->move($destinationPath, $filename);
            DB::insert('insert into files (polygraf_id,file_path,file_name) values (?,?,?)',[$polygraf->id,$destinationPath,$filename]);  
        }

        $out["success"]=true;        
        return response()->json($out,201);
    }
    public function polygraf_delete(Polygraf $polygraf)
    {
        $polygraf->delete();
        return response()->json(null, 204);
    }

}

