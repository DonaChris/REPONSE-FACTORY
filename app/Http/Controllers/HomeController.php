<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    //
    public function home()
    {
        return view('home.home');
    }

    public function contact()
    {
        return view('home.contact');
    }

    public function dashboard()
    {
        return view('home.dashboard');
    }
}
