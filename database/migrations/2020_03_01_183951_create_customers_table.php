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
            $table->date('dob');

            $table->integer('martial_id')->unsigned();
            $table->foreign('martial_id')->references('id')->on('property_martials');

            $table->integer('gender_id')->unsigned();
            $table->foreign('gender_id')->references('id')->on('property_genders');

            
            $table->string('mobphone');
            $table->string('phone');
            $table->string('address_reg');
            $table->string('index_address_reg');
            $table->string('address_res');
            $table->string('index_address_res');

            $table->string('passport_number');
            $table->string('passport_issuedby');
            $table->date('passport_date');

            $table->string('bpl');

            $table->string('inn');
            $table->string('insurance_number');
            $table->string('medical_number');

            $table->integer('education_id')->unsigned();
            $table->foreign('education_id')->references('id')->on('property_educations');
            $table->string('education_name');
            $table->string('education_speciality');

            $table->integer('status_id')->unsigned();
            $table->foreign('status_id')->references('id')->on('property_statuses');
            $table->string('military_number');
            $table->string('military_place');

            $table->integer('criminal_id')->unsigned();
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
