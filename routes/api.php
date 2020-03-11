<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

/**
**Basic Routes for a RESTful service:
**Route::get($uri, $callback);
**Route::post($uri, $callback);
**Route::put($uri, $callback);
**Route::delete($uri, $callback);
**
*/
Route::get('products', 'ProductsController@index');
Route::get('products/{product}', 'ProductsController@show');
Route::post('products','ProductsController@store');
Route::put('products/{product}','ProductsController@update');
Route::delete('products/{product}', 'ProductsController@delete');

Route::get('customers', 'CustomersController@index');
Route::get('customers/{customer}', 'CustomersController@show');
Route::post('customers','CustomersController@store');
Route::put('customers/{customer}','CustomersController@update');
Route::delete('customers/{customer}', 'CustomersController@delete');


Route::get('property_martial', 'PropertyMartialController@index');
Route::get('property_gender', 'PropertyGenderController@index');

//Route::get('customers', 'ProductsController@index');

//Записи в трудовой книжке
//Route::get('customer_history', 'CustomerHistoryController@index');
//Route::get('customer_history/{customer_id}', 'CustomerHistoryController@show');
//Route::get('customer_history/{customer_id}','CustomerHistoryController@show')->where('customer_id', '[0-9]+');
Route::get('customer_history/{customer_id}', 'CustomersController@history')->where('customer_id', '[0-9]+');

Route::get('customer_property/{customer_id}', 'CustomersController@property')->where('customer_id', '[0-9]+');
Route::get('customer_kredit/{customer_id}', 'CustomersController@kredit')->where('customer_id', '[0-9]+');
Route::get('customer_medical/{customer_id}', 'CustomersController@medical')->where('customer_id', '[0-9]+');


//Route::put('customer_history/{customer}','CustomerHistoryController@update');
//Route::delete('customer_history/{customer}', 'CustomerHistoryController@delete');