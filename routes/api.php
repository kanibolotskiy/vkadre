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

Route::get('customers/{filter}/{params?}', 'CustomersController@index');
Route::get('customers/{customer}', 'CustomersController@show');
Route::post('customers','CustomersController@update');
Route::put('customers/{customer}','CustomersController@update');
Route::delete('customers/{customer}', 'CustomersController@delete');


Route::get('property_martial', 'PropertyMartialController@index');
Route::get('property_gender', 'PropertyGenderController@index');

//Route::get('customers', 'ProductsController@index');

//Записи в трудовой книжке
//Route::get('customer_history', 'CustomerHistoryController@index');
//Route::get('customer_history/{customer_id}', 'CustomerHistoryController@show');
//Route::get('customer_history/{customer_id}','CustomerHistoryController@show')->where('customer_id', '[0-9]+');
//Route::get('customer_history/{customer_id}/&sort={sort?}', 'CustomersController@history')->where('customer_id', '[0-9]+');
Route::get('customer_history/{customer_id}/{params?}', 'CustomersController@history')->where('customer_id', '[0-9]+');
Route::post('customer_history','CustomersController@history_store');
Route::put('customer_history/{history}','CustomersController@history_store');
Route::delete('customer_history/{history}', 'CustomersController@history_delete');

Route::get('customer_property/{customer_id}/{params?}', 'CustomersController@property')->where('customer_id', '[0-9]+');
Route::post('customer_property','CustomersController@property_store');
Route::put('customer_property/{property}','CustomersController@property_store');
Route::delete('customer_property/{property}', 'CustomersController@property_delete');

Route::get('customer_credit/{customer_id}/{params?}', 'CustomersController@credit')->where('customer_id', '[0-9]+');
Route::post('customer_credit','CustomersController@credit_store');
Route::put('customer_credit/{credit}','CustomersController@credit_store');
Route::delete('customer_credit/{credit}', 'CustomersController@credit_delete');

Route::get('customer_medical/{customer_id}/{params?}', 'CustomersController@medical')->where('customer_id', '[0-9]+');
Route::post('customer_medical','CustomersController@medical_store');
Route::put('customer_medical/{medical}','CustomersController@medical_store');
Route::delete('customer_medical/{medical}', 'CustomersController@medical_delete');

Route::get('customer_btrip/{customer_id}/{params?}', 'CustomersController@btrip')->where('customer_id', '[0-9]+');
Route::post('customer_btrip','CustomersController@btrip_store');
Route::put('customer_btrip/{btrip}','CustomersController@btrip_store');
Route::delete('customer_btrip/{btrip}', 'CustomersController@btrip_delete');

Route::get('customer_hospital/{customer_id}/{params?}', 'CustomersController@hospital')->where('customer_id', '[0-9]+');
Route::post('customer_hospital','CustomersController@hospital_store');
Route::put('customer_hospital/{hospital}','CustomersController@hospital_store');
Route::delete('customer_hospital/{hospital}', 'CustomersController@hospital_delete');

Route::get('customer_vacation/{customer_id}/{params?}', 'CustomersController@vacation')->where('customer_id', '[0-9]+');
Route::post('customer_vacation','CustomersController@vacation_store');
Route::put('customer_vacation/{vacation}','CustomersController@vacation_store');
Route::delete('customer_vacation/{vacation}', 'CustomersController@vacation_delete');

Route::get('customer_promotion/{customer_id}/{params?}', 'CustomersController@promotion')->where('customer_id', '[0-9]+');
Route::post('customer_promotion','CustomersController@promotion_store');
Route::put('customer_promotion/{promotion}','CustomersController@promotion_store');
Route::delete('customer_promotion/{promotion}', 'CustomersController@promotion_delete');

Route::get('customer_link/{customer_id}/{params?}', 'CustomersController@link')->where('customer_id', '[0-9]+');
Route::post('customer_link','CustomersController@link_store');
Route::put('customer_link/{link}','CustomersController@link_store');
Route::delete('customer_link/{link}', 'CustomersController@link_delete');

Route::get('customer_visit/{customer_id}/{params?}', 'CustomersController@visit')->where('customer_id', '[0-9]+');


Route::get('customer_polygraf/{customer_id}/{params?}', 'CustomersController@polygraf')->where('customer_id', '[0-9]+');
Route::post('customer_polygraf','CustomersController@polygraf_store');
Route::put('customer_polygraf/{polygraf}','CustomersController@polygraf_store');
Route::delete('customer_polygraf/{polygraf}', 'CustomersController@polygraf_delete');

/**Словари */
Route::get('properties/', 'PropertyController@index');
Route::get('properties/{property}/', 'PropertyController@property_index');
Route::post('properties/{property}/','PropertyController@property_update');
Route::delete('properties/{property}/{property_id}', 'PropertyController@property_delete');

Route::post('test_upload/','PropertyController@fileUpload');



/*
Route::delete('properties/martial/{martial}', 'PropertyController@martial_delete');
Route::post('properties/martial/','PropertyController@martial_update');

Route::delete('properties/gender/{gender}', 'PropertyController@gender_delete');
Route::post('properties/gender/','PropertyController@gender_update');


Route::delete('properties/education/{education}', 'PropertyController@education_delete');
Route::post('properties/education/','PropertyController@education_update');

Route::delete('properties/criminal/{criminal}', 'PropertyController@criminal_delete');
Route::post('properties/criminal/','PropertyController@criminal_update');
*/

/**Сотрудники для селектора */
Route::get('customers_select/{searchParam?}', 'CustomersController@customers_select');

//Route::get('typevacations/', 'PropertyController@typevacations');

//Route::put('customer_history/{customer}','CustomerHistoryController@update');
//Route::delete('customer_history/{customer}', 'CustomerHistoryController@delete');