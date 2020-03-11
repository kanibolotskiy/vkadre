<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCustomersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->timestamps();
            $table->string('surname');
            $table->string('name');
            $table->string('patronymic');
            $table->string('photo');
            $table->date('dob')->nullable();
            
            $table->bigInteger('martial_id')->unsigned()->nullable();
            $table->foreign('martial_id')->references('id')->on('property_martials');

            $table->bigInteger('gender_id')->unsigned()->nullable();
            $table->foreign('gender_id')->references('id')->on('property_genders');

            
            $table->string('mobphone');
            $table->string('phone');
            $table->string('address_reg');
            $table->string('index_address_reg');
            $table->string('address_res');
            $table->string('index_address_res');

            $table->string('passport_number');
            $table->string('passport_issuedby');
            $table->date('passport_date')->nullable();;

            $table->string('bpl');

            $table->string('inn');
            $table->string('insurance_number');
            $table->string('medical_number');

            $table->bigInteger('education_id')->unsigned()->nullable();
            $table->foreign('education_id')->references('id')->on('property_educations');
            $table->string('education_name');
            $table->string('education_speciality');

            $table->bigInteger('status_id')->unsigned()->nullable();
            $table->foreign('status_id')->references('id')->on('property_statuses');
            $table->string('military_number');
            $table->string('military_place');

            $table->bigInteger('criminal_id')->unsigned()->nullable();
            $table->foreign('criminal_id')->references('id')->on('property_criminals');
            $table->string('criminal_desc');


            $table->text('characteristic');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('customers');
    }
}
