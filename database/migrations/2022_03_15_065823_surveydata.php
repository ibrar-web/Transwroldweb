<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('surveydata', function (Blueprint $table) {
            $table->id();
            $table->string('worker_id');
            $table->string('customer_id');
            $table->json('alldata');
            $table->string('distance')->nullable();
            $table->string('region');
            $table->string('city');
            $table->string('area');
            $table->string('name');
            $table->json('media');
            $table->timestamp('upload_at')->CURRENT_TIMESTAMP;
            $table->timestamp('created_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('surveydata');
    }
};
