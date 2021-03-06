<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class SurveyController extends Controller
{
    protected function random_strings($length_of_string)
    {
        $str_result = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        return substr(
            str_shuffle($str_result),
            0,
            $length_of_string
        );
    }
    public function surveylogin(Request $request)
    {
        $email = $request->input('email');
        $password = $request->input('password');
        if (DB::table('users')->where('email', $email)->count('id') > 0) {
            $userpass = DB::table('users')->where('email', $email)->pluck('password')[0];
            if (Hash::check($password, $userpass)) {
                $data = [];
                $data['workerid'] = DB::table('users')->where('email', $email)->pluck('id')[0];
                Log::info($data['workerid']);
                $data['customerid'] = 4;
                $data['access_token'] = $this->random_strings(64);
                DB::table('users')->where('email', $email)->update(['access_token' => $data['access_token']]);
                return $data;
            } else {
                return abort(500, 'You are not allowed2');
            }
        } else {
            return abort(500, 'You are not allowed1');
        }
    }
    public function surveydata(Request $request)
    {
        Log::info($request->all());
        $data = [];
        $alldata = $request->input('data');
        $region= $request->input('region');
        $name= $request->input('name');
        $area= $request->input('area');
        $city=$request->input('city');
        $media=$request->input('media');
        $accesstoken = $request->input('access_token');
        $worker_id = $request->input('worker_id');
        $customer_id = $request->input('customer_id');
        $created_at = $request->input('created_at');
        $count = DB::table('users')->where('id', $worker_id)->where('access_token', $accesstoken)->count('id');
        Log::info($count);
        Log::info('$count');
        if ($count > 0) {
            $data['access_token'] = $this->random_strings(64);
            //DB::table('users')->where('id', $worker_id)->update(['access_token' => $data['access_token']]);
            DB::table('surveydata')->insert([
                "customer_id"=>$customer_id,
                "worker_id"=>$worker_id,
                "alldata"=>$alldata,
                "name"=>$name,
                "area"=>$area,
                "city"=>$city,
                "region"=>$region,
                "media"=>$media,
                'created_at'=> $created_at
            ]);
            $data['access_token'] = DB::table('users')->where('id', $worker_id)->pluck('access_token')[0];
            return $data;
        } else {
            return abort(500, 'You are not allowed1');
        }
    }
    public function surveymedia(Request $request)
    {
      
        $data = [];
        $worker_id = $request->input('worker_id');
        $customer_id = $request->input('customer_id');
        $access_token = $request->input('access_token');
        $trackname = $request->input('trackname');
        $destinationPath = public_path('Transworld/'. $customer_id . '/'.$trackname.'/');
        $count = DB::table('users')->where('id', $worker_id)->where('access_token', $access_token)->count('id');
        if ($count > 0) {
            if ($request->file('image')) {
                $data['access_token'] = $this->random_strings(64);
                //DB::table('users')->where('id', $worker_id)->update(['access_token' => $data['access_token']]);
                $file = $request->file('image');
                $filename = $file->getClientOriginalExtension();
                $name=$file->getClientOriginalName();
                Log::info($name);
                $file->move($destinationPath,$name);
            }
        } else {
            return abort(500, 'You are not allowed1');
        }
    }

    public function token(Request $request)
    {
        return $request->input();
    }
}
