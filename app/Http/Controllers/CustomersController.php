<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Customer;
use App\History;
use App\Property;
use App\Kredit;
use App\Medical;

class CustomersController extends Controller
{
    public function index()
    {
        return Customer::all();
    }
 
    public function show(Customer $customer)
    {
        
        return $customer;
    }
 
    public function store(Request $request)
    {
        $customer = Customer::create($request->all());
 
        return response()->json($customer, 201);
    }
 
    public function update(Request $request, Customer $customer)
    {
        $customer->update($request->all());
 
        return response()->json($customer, 200);
    }
 
    public function delete(Customer $customer)
    {
        $customer->delete();
 
        return response()->json(null, 204);
    }
    
    public function history($customer_id){
        $history = History::where('customer_id','=',$customer_id)->get();
        return $history;
    }
    public function property($customer_id){
        $property = Property::where('customer_id','=',$customer_id)->get();
        return $property;
    }
    public function kredit($customer_id){
        $kredit = Kredit::where('customer_id','=',$customer_id)->get();
        return $kredit;
    }
    public function medical($customer_id){
        $medical = Medical::where('customer_id','=',$customer_id)->get();
        return $medical;
    }
    

}
