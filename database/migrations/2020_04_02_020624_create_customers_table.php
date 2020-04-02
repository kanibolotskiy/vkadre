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
            $table->string('education_cap');
            $table->string('education_speciality');

            $table->bigInteger('status_id')->unsigned()->nullable();
            $table->foreign('status_id')->references('id')->on('property_statuses');
            $table->string('military_number');
            $table->string('military_place');

            $table->bigInteger('criminal_id')->unsigned()->nullable();
            $table->foreign('criminal_id')->references('id')->on('property_criminals');
            $table->string('criminal_desc');
            $table->text('characteristic');


            $table->bigInteger('subdivision_id')->unsigned()->nullable();
            $table->foreign('subdivision_id')->references('id')->on('property_subdivisions');
            
            $table->bigInteger('department_id')->unsigned()->nullable();
            $table->foreign('department_id')->references('id')->on('property_departments');
            $table->string('position');

            $table->bigInteger('custstatus_id')->unsigned()->nullable();
            $table->foreign('custstatus_id')->references('id')->on('property_custstatuses');
            $table->date('empl_date')->nullable();
            $table->date('unempl_date')->nullable();

            $table->date('exp1')->nullable();
            $table->date('exp2')->nullable();
            $table->date('exp3')->nullable();
            
            $table->bigInteger('curator_id')->unsigned()->nullable();;
            $table->foreign('curator_id')->references('id')->on('customers');

            $table->float('salary',10,2)->nullable();
            $table->float('salary_add',10,2)->nullable();
            $table->float('salary_summ',10,2)->nullable();
            $table->float('prize_perc',10,2)->nullable();
            $table->float('prize',10,2)->nullable();

            $table->string('vacation_base');
            $table->string('vacation_add');

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
