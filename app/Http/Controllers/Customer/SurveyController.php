<?php

namespace App\Http\Controllers\Customer;

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
    public function findmydata(Request $request)
    {   
        $data['data']=DB::table('surveydata')->get();
        return $data;
        
        $data = [];
        $userid = Auth::user()->id;
        $accesstoken = $request->input('accesstoken');
        $count = DB::table('users')->where('id', $userid)->where('access_token', $accesstoken)->count('id');
        if ($count == 0) {
            $data['access_token'] = $this->random_strings(64);
            DB::table('users')->where('id', $userid)->update(['access_token' => $data['access_token']]);
            $data['data']=DB::table('surveydata')->get();
            return $data;
        } else {
            return abort(500, 'You are not allowed1');
        }
    }
}
