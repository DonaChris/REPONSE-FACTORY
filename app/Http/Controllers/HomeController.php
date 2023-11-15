<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    //
    public function home() {
        return view('layouts.home.home');
    }

    public function contact() {
        return view('layouts.home.contact');
    }

    public function dashboard() {
        return view('layouts.home.dashboard');
    }
}
