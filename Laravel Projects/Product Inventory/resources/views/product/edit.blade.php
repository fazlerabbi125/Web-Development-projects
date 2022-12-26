@extends('..layouts.app')
@section('title')  Edit product    @endsection
@section('content')
<div class="card mx-auto shadow-sm w-50">
  <h4 class="card-header text-center">
    Edit Your Product Info
  </h4>
  <div class="card-body">
    <p class="card-text">
        <form method="POST" action="{{ route('product.update',['product'=>$product->id]) }}" enctype="multipart/form-data">
            @csrf
            @method('PUT')
            <div class="row mb-3">
                <label for="name" class="col-md-3 col-form-label text-md-end">Name</label>
                <div class="col-md-6">
                    <input type="text" class="form-control @error('name') is-invalid @enderror" id="name" name="name" required value="{{ $product->name }}">        
                </div>
            </div>
            @error('name')
                <div class="text-danger text-center">{{ $message }}</div>
            @enderror
            <div class="row mb-3">
                <label for="price" class="col-md-3 col-form-label text-md-end">Price</label>
                <div class="col-md-6">
                <input type="text" class="form-control @error('price') is-invalid @enderror" id="price" name="price" required value="{{ $product->price }}">
                </div>
            </div>
            @error('price')
            <div class="text-danger text-center">{{ $message }}</div>
            @enderror
            <div class="row mb-3">
                <label for="quantity" class="col-md-3 col-form-label text-md-end">Quantity</label>
                <div class="col-md-6">
                <input type="number" class="form-control @error('quantity') is-invalid @enderror" id="quantity" name="quantity" required value="{{ $product->quantity }}">
                </div>
            </div>
            @error('quantity')
            <div class="text-danger text-center">{{ $message }}</div>
            @enderror
            <div class="row mb-3">
                <label for="id_photo" class="col-md-3 col-form-label text-md-end">Current Photo</label>
                <div class="col-md-6"><a href="{{ asset('storage/'.$product->image_path) }}">{{ $product->image_path }}</a> 
                <span><input type="checkbox" name="photo-clear" id="photo-clear_id">
                <label for="photo-clear_id">Clear</label></span>
                </div>
            </div>
            <div class="row mb-3">
                <label for="image_path" class="col-md-3 col-form-label text-md-end">New Photo</label>
                <div class="col-md-6">
                <input type="file" class="form-control @error('image_path') is-invalid @enderror" id="image_path" name="image_path">
                </div>
            </div>
            @error('image_path')
            <div class="text-danger text-center">{{ $message }}</div>
            @enderror
            <div class="row mb-3">
                <label for="category" class="col-md-3 col-form-label text-md-end">Category</label>
                <div class="col-md-6">
                    <select id="category" name="category_id" class="form-select" required>
                        <option disabled>Select Category</option>
                        @forelse ($categories as $category)
                            <option value="{{ $category->id }}"
                            @if ($category->id === $product->category_id ) selected @endif
                            >{{ $category->name }}</option>
                        @empty
                            <p>No categories available</p>
                        @endforelse
                    </select>
                </div>
            </div>
            @error('category_id')
            <div class="text-danger text-center">{{ $message }}</div>
            @enderror
            <div class="row mb-3">
                <label for="description" class="col-md-3 col-form-label text-md-end">Description</label>
                <div class="col-md-6">
                <textarea name="description" class="form-control @error('description') is-invalid @enderror" id="description" cols="50" rows="10">{{ $product->description }}</textarea>
                </div>
            </div>
            @error('description')
            <div class="text-danger text-center">{{ $message }}</div>
            @enderror
            <div class="d-grid gap-2 col-6 mx-auto">
                <button class="btn btn-primary" type="submit">Submit</button>
            </div>
        </form>
  </div>
</div>
@endsection