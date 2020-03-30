<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLinksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('links', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->timestamps();
            $table->bigInteger('customer_id')->unsigned();
            $table->foreign('customer_id')->references('id')->on('customers')->onDelete('cascade');

            $table->bigInteger('linked_customer_id')->unsigned()->nullable();
            $table->foreign('linked_customer_id')->references('id')->on('customers');
            $table->string('linked_customer')->nullable();
            
            $table->bigInteger('typelink_id')->unsigned()->nullable();
            $table->foreign('typelink_id')->references('id')->on('property_typelinks')->onDelete('cascade');

            $table->text('comment')->nullable();
            $table->date('date')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('links');
    }
}
