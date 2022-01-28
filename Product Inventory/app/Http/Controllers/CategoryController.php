<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    //
    public function __construct()
    {
        $this->middleware('auth');
    }
    public function index()
    {
        $categories=Category::all();
        return view('category',['categories' => $categories]);
    }
    public function create(Request $request)
    {
        $validated= $request->validate([
            'name' => 'required|string|max:255|unique:App\Models\Category,name',
        ]);    
        $category=Category::create(['name'=>$validated['name']]);
        return redirect()->route('category');
    }
}
