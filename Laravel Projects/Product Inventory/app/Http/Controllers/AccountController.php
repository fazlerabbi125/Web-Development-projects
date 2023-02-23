<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class AccountController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('success');
    }

    public function edit($id)
    {
        $user=User::findOrFail($id);
        return view('auth.account_info');
    }
    public function update(Request $request,$id)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'photo' => ['nullable','mimes:jpg,jpeg,png']
        ]);
        $user=User::findOrFail($id);
        $user->name = $validated['name'];
        $user->email= $validated['email'];
        $user->password= $validated['password'];
        if (isset($validated['photo'])){
            $user->photo = $validated['photo']->store('profiles/uploads','public');
        }
        elseif (isset($validated['photo-clear'])) {
            $user->photo = 'profiles/default.png';
        }
        $user->save();
        return redirect('/')->with('success', 'Your profile info has been updated!');
    }
    public function delete(Request $request,$id)
    {
        if ($request->isMethod('delete')) {
            $user=User::findOrFail($id);
            $user->delete();
            return redirect('/dashboard/account-deleted');
        }
        return view('auth.account_deletion');
    }
}
