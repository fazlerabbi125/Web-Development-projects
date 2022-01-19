@extends('layouts.app')
@section('title')   Account Deletion    @endsection
@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header"> @auth Dashboard @else Notice @endauth</div>

                <div class="card-body">
                    @auth
                    <form method="POST" action="{{ route('account-delete',Auth::user()->id) }}">
                        @csrf
                        @method('DELETE')
                        <p>Are you sure you want to delete your account?</p> 
                        <div class="float-end">
                            <a class="btn btn-secondary" href="{{ route('home') }}">Back</a>
                            <input type="submit" value="Confirm" class="btn btn-danger">
                        </div>
                    </form>
                    @else
                        <span class="text-danger">Your account has been deleted!</span>
                    @endauth
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
